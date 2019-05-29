const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const event_model = require('../../../models/event')
const date_format = require('date-fns/format')
const slug_format = require('../../../utils/slug_format')
const append_slug_suffix = require('../../../utils/append_slug_suffix')
const create_row_id = require('../../../utils/create_row_id')
const validate_input_for_event = require('../../../validation/event')

// @route      GET api/v1/events
// @desc       Gets all events
// @access     Public
router.get('/', (req, res) => {
   event_model
      .find()
      .then(events => {
         res.json(events)
      })
      .catch(err => console.log(err))
})

// @route      POST api/v1/events
// @desc       Create a new event in the events resource
// @access     Public
router.post('/', (req, res) => {
   const body = req.body
   // Validate user input
   const { errors, is_valid } = validate_input_for_event(body)
   if (!is_valid) {
      return res.status(400).json(errors)
   }

   const event_obj = {}
   // These are fields that can be updated via the API
   if (body.title) event_obj.title = body.title // String, required
   if (body.started_on) event_obj.started_on = body.started_on // Date, default Date.now
   if (body.is_active) event_obj.is_active = body.is_active // Boolean, default true

   event_model
      .findById(body._id)
      .then(async event => {
         if (event) {
            // if we include an id in the request and it matches a document, update

            event_model
               .findByIdAndUpdate(body._id, { $set: event_obj }, { new: true })
               .then(updated_event => res.json(updated_event))
               .catch(err => res.status(400).json(err))
         } else {
            // Create event
            let event_date = date_format(
               body.started_on || Date.now(),
               'MMMM-Do-YYYY'
            )
            const slug = slug_format(`${event_date}-${body.title}`)
            event_obj.slug = await append_slug_suffix(event_model, slug)
            event_obj.row_id = await create_row_id(event_model)

            new event_model(event_obj)
               .save()
               .then(event => {
                  res.json(event)
               })
               .catch(err => res.status(400).json(err))
         }
      })
      .catch(err => res.status(400).json(err))
})

const example_api_return = {
   _id: mongoose.Schema.Types.ObjectId,
   row_id: Number,
   title: String,
   started_on: Date,
   slug: String,
   is_active: Boolean,
}

module.exports = router
