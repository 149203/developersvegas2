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
const convert_datetime_num_to_str = require('../../../utils/convert_datetime_num_to_str')
const validate_input_for_presentation = require('../../../validation/presentation')
const cast_to_object_id = require('mongodb').ObjectID
const has = require('lodash/has')
const date_format = require('date-fns/format')
const to_lower = require('lodash/toLower')

// @route      POST api/v1/demo-day
// @desc       Create all data for a demo day
// @access     Public
router.post('/', async (req, res) => {
   // console.log('SERVER: ', req.body.demo_day_presentations)
   const demo_days = JSON.parse(req.body.demo_day_presentations)

   // hard-coded stuff for now
   const agreement_id = cast_to_object_id('5d0e6f4d63f3b43f2830cd4f')
   const has_accepted_agreement = true

   const results = []

   for (let demo_day of demo_days) {
      // forEach doesn't work with async/await
      // https://dev.to/burkeholland/asyncawait-and-the-foreach-pit-of-despair-2267
      // console.log(
      //    'EVENT DATE FROM SIGN IN LIST: ',
      //    String(demo_day.event.started_on)
      // )
      const event_id = await get_object_id(event_model, {
         started_on: demo_day.event.started_on,
      })

      const member_id = await get_object_id(member_model, {
         email: demo_day.member.email,
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

      // Validate stuff before trying to upsert into db
      const { errors, is_valid } = validate_input_for_presentation(
         presentation_obj
      )
      if (!is_valid) {
         return res.status(400).json(errors)
      }

      let slug_fields = [presentation_obj.title]
      if (to_lower(presentation_obj.title) === 'untitled project') {
         const event_date = await event_model
            .findById(event_id)
            .then(event =>
               date_format(
                  convert_datetime_num_to_str(event.started_on),
                  'MMMM-Do-YYYY'
               )
            )
            .catch(err => res.status(400).json(err))
         slug_fields = [event_date, presentation_obj.title]
      }

      const presentation = await upsert({
         payload: presentation_obj,
         collection: presentation_model,
         options: {
            should_create_slug: true,
            should_create_row_id: false,
            slug_fields, // an array of strings, in order
         },
         filter: { event_id, member_id },
      })
      const xref_presentation_technology = []

      if (presentation.has_error) res.status(400).json(presentation)
      else if (has(demo_day, 'technologies')) {
         const presentation_id = presentation._id
         const technology_ids = demo_day.technologies.map(technology =>
            get_object_id(technology_model, { row_id: technology.id })
         )

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
               filter: { presentation_id, technology_id },
            }) // will update with fields it already has (do nothing)

            if (xref.has_error) res.status(400).json(xref)
            else xref_presentation_technology.push(xref)
         }
      }
      results.push({ presentation, xref_presentation_technology })
   }
   res.json(results)
})

module.exports = router
