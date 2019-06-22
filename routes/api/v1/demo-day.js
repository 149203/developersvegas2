const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const event_model = require('../../../models/event')
const presentation_model = require('../../../models/presentation')
const slug_format = require('../../../utils/slug_format')
const append_slug_suffix = require('../../../utils/append_slug_suffix')
const create_row_id = require('../../../utils/create_row_id')
const validate_input_for_presentation = require('../../../validation/presentation')
const cast_to_object_id = require('mongodb').ObjectID
const _has = require('lodash/has')
const _for_each = require('lodash/forEach')

// @route      POST api/v1/demo-day
// @desc       Create all data for a demo day
// @access     Public
router.post('/', (req, res) => {
   const demo_days = req.body
   // Validate user input
   // const { errors, is_valid } = validate_input_for_presentation(body)
   // if (!is_valid) {
   //    return res.status(400).json(errors)
   // }

   // get object_ids for agreement
   const agreement_id = cast_to_object_id('5d0e6f4d63f3b43f2830cd4f') // hard-coded ID of agreement 0.1

   _for_each(demo_days, async demo_day => {
      // get object_ids for event, member

      const started_on = new Date(demo_day.event.date)
      let event_id
      await event_model
         .findOne({ started_on })
         .then(event => (event_id = event._id))

      console.log({ agreement_id, event_id })

      const presentation_obj = {}
      const presentation_technology_obj = {}
      // These are fields that can be updated via the API
   })
})

const example_api_return = {
   _id: mongoose.Schema.Types.ObjectId,
   title: String,
   signed_up_on: Date,
   has_accepted_agreement: Boolean,
   order: Number,
   video_url: String,
   video_screenshot_url: String,
   is_active: Boolean,
   slug: String,
   row_id: Number,
}

module.exports = router
