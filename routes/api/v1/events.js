const express = require('express')
const router = express.Router()
const event_model = require('../../../models/event')
const presentation_model = require('../../../models/presentation')
const date_format = require('date-fns/format')
const slug_format = require('../../../utils/slug_format')
const append_slug_suffix = require('../../../utils/append_slug_suffix')
const validate_input_for_event = require('../../../validation/event')
const validator = require('validator')
const convert_datetime_num_to_str = require('../../../utils/convert_datetime_num_to_str')
const map = require('lodash/map')

// @route      GET api/v1/events?occurs&date
// @desc       Gets all events, or all events preceding today, or the upcoming event
// @access     Public
router.get('/', async (req, res) => {
   if (req.query.occurs && req.query.date) {
      const today = req.query.date
      if (req.query.occurs === 'before') {
         const past_events = []
         await event_model
            .find({ ended_on: { $lt: today } })
            .select(
               '_id started_on ended_on title is_active slug location_name location_url location_city location_state'
            )
            .sort({ ended_on: 'desc' })
            .then(async events => {
               // for each event in events
               for (let event of events) {
                  // find presentations with this event_id
                  let past_presentations = []
                  await presentation_model
                     .find({ event_id: event._id })
                     .select(
                        'title member_id order is_active slug is_featured video_id video_url'
                     )
                     .populate(
                        // populate member data for each presentation
                        'member_id',
                        ['first_name', 'last_name', 'is_active', 'slug'],
                        member
                     )
                     .sort({ order: 'asc' })
                     .lean() // converts to a plain JS object
                     .then(presentations => {
                        past_presentations = map(
                           presentations,
                           presentation => {
                              presentation.member_first_name =
                                 presentation.member_id.first_name
                              presentation.member_last_name =
                                 presentation.member_id.last_name
                              presentation.member_is_active =
                                 presentation.member_id.is_active
                              presentation.member_slug =
                                 presentation.member_id.slug
                              // assignments are evaluated in order
                              // so we can overwrite the member_id property in the last assignment
                              presentation.member_id =
                                 presentation.member_id._id
                              return presentation
                           }
                        )
                     })
                     .catch(err => res.status(400).json(err))

                  // push {event, presentations}
                  if (past_presentations.length > 0) {
                     past_events.push({ event, past_presentations })
                  }
               }

               return res.json(past_events)
            })
            .catch(err => res.status(400).json(err))
      } else if (req.query.occurs === 'after') {
         await event_model
            .findOne({ ended_on: { $gt: today } })
            .lean() // needed because mongoose models do not return JS objects and this converts to JS object
            .then(async event => {
               // Return presentations for this next (current) event
               await presentation_model
                  .find({ event_id: event._id })
                  .sort({ order: 'asc', signed_up_on: 'asc' })
                  .populate(
                     // populate member data for each presentation
                     'member_id',
                     ['first_name', 'last_name', 'is_active'],
                     member
                  )
                  .then(presentations => {
                     event.presentations = presentations
                  })
                  .catch(err => res.status(400).json(err))

               return res.json(event)
            })
            .catch(err => res.status(400).json(err))
      } else
         return res
            .status(400)
            .json(
               'There is a problem with the "occurs" and "date" queries in this request.'
            )
   } else {
      event_model
         .find() // get all events
         .then(events => {
            return res.json(events)
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
            return res.json(event)
         })
         .catch(err => res.status(400).json(err))
   }
})

// @route      POST api/v1/events/:event_id
// @desc       Updates an event by its event_id
// @access     Public
router.post('/:event_id', (req, res) => {
   const event_id = req.params.event_id
   const body = req.body
   // Validate user input
   const { errors, is_valid } = validate_input_for_event(body)
   if (!is_valid) {
      return res.status(400).json(errors)
   }

   const event_obj = {}
   // These are fields that can be updated via the API
   if (body.title) event_obj.title = body.title // String, required
   if (typeof body.started_on !== 'undefined')
      event_obj.started_on = body.started_on // Number, required
   if (typeof body.ended_on !== 'undefined') event_obj.ended_on = body.ended_on // Number, required
   if (typeof body.is_active !== 'undefined')
      event_obj.is_active = body.is_active // Boolean, default true
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

   // Validate event_id
   if (!validator.isMongoId(event_id)) {
      errors.event_id = 'event_id must be a valid Mongo ID.'
      return res.status(400).json(errors)
   } else {
      event_model
         .findByIdAndUpdate(event_id, event_obj, { new: true })
         .then(event => {
            return res.json(event)
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
   if (typeof body.started_on !== 'undefined')
      event_obj.started_on = body.started_on // Number, required
   if (typeof body.ended_on !== 'undefined') event_obj.ended_on = body.ended_on // Number, required
   if (typeof body.is_active !== 'undefined')
      event_obj.is_active = body.is_active // Boolean, default true
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
            const datetime = convert_datetime_num_to_str(body.started_on)
            let event_date = date_format(datetime, 'MMMM-Do-YYYY')
            const slug = slug_format(`${event_date}-${body.title}`)
            event_obj.slug = await append_slug_suffix(event_model, slug)

            new event_model(event_obj)
               .save()
               .then(event => {
                  return res.json(event)
               })
               .catch(err => res.status(400).json(err))
         }
      })
      .catch(err => res.status(400).json(err))
})

module.exports = router
