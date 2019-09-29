const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const event_model = require('../../../models/event')
const date_format = require('date-fns/format')
const slug_format = require('../../../utils/slug_format')
const append_slug_suffix = require('../../../utils/append_slug_suffix')
const validate_input_for_event = require('../../../validation/event')
const validator = require('validator')

// @route      GET api/v1/events?occurs&date
// @desc       Gets all events, or all events preceding today, or the upcoming event
// @access     Public
router.get('/', (req, res) => {
   if (req.query.occurs && req.query.date) {
      const today = req.query.date
      console.log(today)
      if (req.query.occurs === 'before') {
         event_model
            .find({ ended_on: { $lt: today } })
            .sort({ ended_on: 'desc' })
            .then(events => {
               res.json(events)
            })
            .catch(err => res.status(400).json(err))
      } else if (req.query.occurs === 'after') {
         event_model
            .findOne({ ended_on: { $gt: today } })
            .then(events => {
               res.json(events)
            })
            .catch(err => res.status(400).json(err))
      } else
         res.status(400).json(
            'There is a problem with the occurs and date queries in this request.'
         )
   } else {
      event_model
         .find()
         .then(events => {
            res.json(events)
         })
         .catch(err => res.status(400).json(err))
   }
})

// @route      GET api/v1/events/:event_id
// @desc       Gets an event by its event_id
// @access     Public
router.get('/:event_id', (req, res) => {
   const event_id = req.params.event_id
   // Validate event_id
   let errors = {}
   if (!validator.isMongoId(event_id)) {
      errors.event_id = 'event_id must be a valid Mongo ID.'
      return res.status(400).json(errors)
   } else {
      event_model
         .findById(event_id)
         .then(event => {
            res.json(event)
         })
         .catch(err => res.status(400).json(err))
   }
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
   if (body.started_on) event_obj.started_on = body.started_on // Date, required
   if (body.ended_on) event_obj.ended_on = body.ended_on // Date, required
   if (body.is_active) event_obj.is_active = body.is_active // Boolean, default true
   if (body.location_name) event_obj.location_name = body.location_name // String, required
   if (body.location_street_1)
      event_obj.location_street_1 = body.location_street_1 // String, required
   if (body.location_street_2)
      event_obj.location_street_2 = body.location_street_2 // String, required
   if (body.location_city) event_obj.location_city = body.location_city // String, required
   if (body.location_state) event_obj.location_state = body.location_state // String, required
   if (body.location_zip) event_obj.location_zip = body.location_zip // String, required
   if (body.location_url) event_obj.location_url = body.location_url // String, required
   if (body.cost) event_obj.cost = body.cost // String, required
   if (body.description) event_obj.description = body.description // String, required

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

module.exports = router
