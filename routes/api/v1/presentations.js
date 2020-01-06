const express = require('express')
const router = express.Router()
const presentation_model = require('../../../models/presentation')
const xref_presentation_technology_model = require('../../../models/xref_presentation_technology')
const validate_input_for_presentation = require('../../../validation/presentation')
const member_model = require('../../../models/member')
const event_model = require('../../../models/event')
const cast_to_object_id = require('mongodb').ObjectID
const date_format = require('date-fns/format')
const convert_datetime_num_to_str = require('../../../utils/convert_datetime_num_to_str')
const untitled_presentation_title = require('../../../utils/untitled_presentation_title')
const has = require('lodash/has')

// @route      GET api/v1/presentations?started_on
// @desc       Gets all presentations filtered by the event's started_on date, else all presentations
// @access     Public
router.get('/', (req, res) => {
   if (req.query.started_on) {
      const started_on = Number(req.query.started_on)
      presentation_model
         .find()
         .populate('member_id', ['first_name', 'last_name'], member_model)
         .populate('event_id', ['title', 'started_on'], event_model)
         .sort({ order: 'asc' })
         .then(presentations => {
            const filtered_presentations = presentations.filter(
               presentation => {
                  return presentation.event_id.started_on === started_on
               }
            )
            res.json(filtered_presentations)
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
// @desc       Post a presentation to the presentations resource
// @access     Public
router.post('/', async (req, res) => {
   const presentation = req.body

   // Assign to payload
   const payload = {}
   if (presentation.title) {
      payload.title = presentation.title // string, optional
   } else {
      payload.title = untitled_presentation_title
   }
   payload.event_id = cast_to_object_id(presentation.event_id) // object_id, required
   payload.member_id = cast_to_object_id(presentation.member_id) // object_id, required
   payload.agreement_id = cast_to_object_id(presentation.agreement_id) // object_id, required
   payload.has_accepted_agreement = presentation.has_accepted_agreement // boolean, required
   if (typeof presentation.order !== 'undefined') {
      payload.order = presentation.order // number, optional
   }
   if (typeof presentation.is_featured !== 'undefined') {
      payload.is_featured = presentation.is_featured // boolean, optional
   }
   if (typeof presentation.is_active !== 'undefined') {
      payload.is_active = presentation.is_active // boolean, optional
   }
   payload.video_id = convert_undefined(presentation.video_id) // string, optional
   payload.video_screenshot_url = convert_undefined(
      presentation.video_screenshot_url
   ) // string, optional
   payload.video_screenshot_with_play_url = convert_undefined(
      presentation.video_screenshot_with_play_url
   ) // string, optional
   payload.video_url = convert_undefined(presentation.video_url) // string, optional
   payload.video_iframe = convert_undefined(presentation.video_iframe) // string, optional

   // Validate stuff before trying to upsert into db
   const { errors, is_valid } = validate_input_for_presentation(payload)
   if (!is_valid) {
      console.log(errors)
      return res.status(400).json(errors)
   }

   // Create slug fields
   let slug_fields = [payload.title]
   if (payload.title === untitled_presentation_title) {
      const event_date = date_format(
         convert_datetime_num_to_str(presentation.event_started_on),
         'MMMM-Do-YYYY'
      )
      slug_fields = [event_date, payload.title]
   }

   const { event_id, member_id } = payload

   // Upsert presentation
   const upserted_presentation = await upsert({
      payload,
      collection: presentation_model,
      options: {
         should_create_slug: true,
         should_create_row_id: false,
         slug_fields, // an array of strings, in order
      },
      filter: { event_id, member_id }, // only one presentation per member per event, therefore if they try to insert another presentation, it will upsert over their previous one
   })

   const xref_presentation_technology = []

   // Upsert presentation_technology xrefs
   if (upserted_presentation.has_error) {
      return res.status(400).json(upserted_presentation)
   } else if (has(presentation, 'technologies')) {
      const presentation_id = upserted_presentation._id
      const technology_ids = presentation.technologies

      for await (const technology_id of technology_ids) {
         // for await...of
         // https://medium.com/@ian.mundy/async-map-in-javascript-b19439f0099
         // https://stackoverflow.com/a/50874507
         const xref = await upsert({
            payload: { presentation_id, technology_id },
            collection: xref_presentation_technology_model,
            options: {
               should_create_slug: false,
               should_create_row_id: false,
            },
            filter: { presentation_id, technology_id }, // will update with fields it already has (do nothing)
         })

         if (xref.has_error) {
            return res.status(400).json(xref)
         } else xref_presentation_technology.push(xref)
      }
   }

   // Return results
   const results = { presentation, xref_presentation_technology }
   return res.json(results)
})

// @route      POST api/v1/presentations/all-deprecated
// @desc       Post multiple presentations from a file // DEPRECATED
// @access     Public
router.post('/all-deprecated', async (req, res) => {
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
