const express = require('express')
const router = express.Router()
const presentation_model = require('../../../models/presentation')
const validate_input_for_presentation = require('../../../validation/presentation')
const member = require('../../../models/member')
const event = require('../../../models/event')
const cast_to_object_id = require('mongodb').ObjectID

// @route      GET api/v1/presentations?event_id
// @desc       Gets all presentations or presentations filtered by event_id
// @access     Public
router.get('/', (req, res) => {
   if (req.query.event_id) {
      const event_id = req.query.event_id
      console.log(event_id)
      presentation_model
         .find({ event_id })
         .populate('member_id', ['first_name', 'last_name'], member)
         .populate('event_id', ['title', 'started_on'], event)
         .sort({ order: 'asc' })
         .then(presentations => {
            res.json(presentations)
         })
         .catch(err => res.status(400).json(err))
   } else {
      presentation_model
         .find()
         .then(presentations => {
            res.json(presentations)
         })
         .catch(err => res.status(400).json(err))
   }
})

// @route      POST api/v1/presentations
// @desc       Create a new presentation in the presentations resource
// @access     Public
router.post('/', async (req, res) => {
   console.log('SERVER: ', req.body.demo_day_presentations)
   const demo_days = JSON.parse(req.body.demo_day_presentations)
   const results = []

   for (let demo_day of demo_days) {
      // forEach doesn't work with async/await
      // https://dev.to/burkeholland/asyncawait-and-the-foreach-pit-of-despair-2267

      const presentation_obj = {}
      presentation_obj._id = cast_to_object_id(demo_day._id)
      presentation_obj.title = convert_undefined(demo_day.title)
      presentation_obj.order = convert_undefined(demo_day.order)
      presentation_obj.has_accepted_agreement = convert_undefined(
         demo_day.has_accepted_agreement
      )
      presentation_obj.video_screenshot_url = convert_undefined(
         demo_day.video_screenshot_url
      ) // optional
      presentation_obj.video_screenshot_with_play_url = convert_undefined(
         demo_day.video_screenshot_with_play_url
      ) // optional
      presentation_obj.video_url = convert_undefined(demo_day.video_url) // optional
      presentation_obj.video_iframe = convert_undefined(demo_day.video_iframe) // optional

      // Validate stuff before trying to upsert into db
      const { errors, is_valid } = validate_input_for_presentation(
         presentation_obj
      )
      if (!is_valid) {
         return res.status(400).json(errors)
      }

      let slug_fields = []

      const presentation = await upsert({
         payload: presentation_obj,
         collection: presentation_model,
         options: {
            should_create_slug: false,
            should_create_row_id: false,
            slug_fields, // an array of strings, in order
         },
         filter: { _id: presentation_obj._id },
      })

      if (presentation.has_error) res.status(400).json(presentation)

      results.push({ presentation })
   }
   res.json(results)
})

module.exports = router
