const express = require('express')
const router = express.Router()
const event_model = require('../../../models/event')
const member_model = require('../../../models/member')
const presentation_model = require('../../../models/presentation')
const technology_model = require('../../../models/technology')
const xref_presentation_technology_model = require('../../../models/xref_presentation_technology')
const convert_undefined = require('../../../utils/convert_undefined')
const get_object_id = require('../../../utils/get_object_id')
const upsert = require('../../../utils/upsert')
const validate_input_for_presentation = require('../../../validation/presentation')
const cast_to_object_id = require('mongodb').ObjectID
const has = require('lodash/has')

// @route      POST api/v1/demo-day
// @desc       Create all data for a demo day
// @access     Public
router.post('/', async (req, res) => {
   const demo_days = req.body
   // Validate user input
   // const { errors, is_valid } = validate_input_for_presentation(body)
   // if (!is_valid) {
   //    return res.status(400).json(errors)
   // }

   // hard-coded stuff for now
   const agreement_id = cast_to_object_id('5d0e6f4d63f3b43f2830cd4f')
   const has_accepted_agreement = true

   const results = []

   for (let demo_day of demo_days) {
      // forEach doesn't work with async/await
      // https://dev.to/burkeholland/asyncawait-and-the-foreach-pit-of-despair-2267
      const event_id = await get_object_id(event_model, {
         started_on: new Date(demo_day.event.date),
      })

      const member_id = await get_object_id(member_model, {
         row_id: demo_day.member.row_id,
      })

      const presentation_obj = {}
      presentation_obj.agreement_id = agreement_id
      presentation_obj.has_accepted_agreement = has_accepted_agreement
      presentation_obj.event_id = event_id
      presentation_obj.member_id = member_id
      presentation_obj.title = demo_day.presentation.title
      presentation_obj.order = demo_day.presentation.order
      presentation_obj.is_active = demo_day.presentation.is_active
      presentation_obj.video_screenshot_url = convert_undefined(
         demo_day.presentation.video_screenshot_url
      ) // optional
      presentation_obj.video_screenshot_with_play_url = convert_undefined(
         demo_day.presentation.video_screenshot_with_play_url
      ) // optional
      presentation_obj.video_url = convert_undefined(
         demo_day.presentation.video_url
      ) // optional
      presentation_obj.video_iframe = convert_undefined(
         demo_day.presentation.video_iframe
      ) // optional

      const result = await upsert({
         payload: presentation_obj,
         collection: presentation_model,
         options: {
            should_create_slug: true,
            should_create_row_id: true,
         },
         filter: { event_id, member_id },
      })

      if (result.has_error) res.status(400).json(result)
      else if (has(demo_day, 'technologies')) {
         const presentation_id = result._id
         const technology_ids = demo_day.technologies.map(technology =>
            get_object_id(technology_model, { row_id: technology.id })
         )
         for await (const technology_id of technology_ids) {
            // for await...of
            // https://medium.com/@ian.mundy/async-map-in-javascript-b19439f0099
            // https://stackoverflow.com/a/50874507
            // console.log({ presentation_id, technology_id })
            const xref_result = upsert({
               payload: { presentation_id, technology_id },
               collection: xref_presentation_technology_model,
               options: {
                  should_create_slug: false,
                  should_create_row_id: false,
               },
               filter: { presentation_id, technology_id }, // will update with fields it already has (do nothing)
            })

            // push this result
         }
      }

      results.push(result)

      // push all results
   }

   // console.log(results)

   // res.json(presentation) return a custom response with all fields
})

module.exports = router
