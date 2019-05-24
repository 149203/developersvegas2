const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const event_member_model = require('../../../models/xref_event_member')
const validate_input_for_event_member = require('../../../validation/event_member')
const cast_to_object_id = require('mongodb').ObjectID

// @route      GET api/v1/attendees/:event_id
// @desc       Get all event_members for an event_id
// @access     Public
router.get('/:event_id', (req, res) => {
   const event_id = req.params.event_id
   event_member_model
      .find({ event_id })
      .then(attendees => {
         res.json(attendees)
      })
      .catch(err => console.log(err))
})

// @route      POST api/v1/attendees
// @desc       Create a new event_member in the event_members resource
// @access     Public
router.post('/', (req, res) => {
   const body = req.body
   // Validate user input
   const { errors, is_valid } = validate_input_for_event_member(body)
   if (!is_valid) {
      return res.status(400).json(errors)
   }

   const event_member_obj = {}
   // These are fields that can be updated via the API
   if (body.member_id) event_member_obj.member_id = body.member_id // ObjectId, required
   if (body.event_id) event_member_obj.event_id = body.event_id // ObjectId, required

   const member_id = cast_to_object_id(body.member_id)
   const event_id = cast_to_object_id(body.event_id)

   event_member_model
      .findOne({ member_id, event_id })
      .then(event_member => {
         if (event_member) {
            // fail silently, let user continue without creating a new event_member
            console.log('This member is already attending this event.')
            res.json(event_member)
         } else {
            // Create new event_member
            new event_member_model(event_member_obj)
               .save()
               .then(event_member => {
                  res.json(event_member)
               })
               .catch(err => res.status(400).json(err))
         }
      })
      .catch(err => res.status(400).json(err))
})

const example_api_return = {
   _id: mongoose.Schema.Types.ObjectId,
   event_id: mongoose.Schema.Types.ObjectId,
   member_id: mongoose.Schema.Types.ObjectId,
}

module.exports = router
