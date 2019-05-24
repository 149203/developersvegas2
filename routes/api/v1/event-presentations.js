const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const event_presentation_model = require('../../../models/xref_event_presentation')
const validate_input_for_event_member = require('../../../validation/event_member')
const cast_to_object_id = require('mongodb').ObjectID
const validator = require('validator')

// @route      GET api/v1/event-presentations/:event-id
// @desc       Given an event, read all presentations from the event-presentations resource
// @access     Public
router.get('/:event_id', (req, res) => {
   const event_id = req.params.event_id

   // Validate URL
   let errors = {}
   if (!validator.isMongoId(event_id)) {
      errors.event_id = 'event_id must be a valid Mongo ID.'
      return res.status(400).json(errors)
   }

   event_presentation_model
      .find({ event_id })
      .then(presentations => {
         res.json(presentations)
      })
      .catch(err => console.log(err))
})

const example_api_return = [
   {
      member: {
         _id: mongoose.Schema.Types.ObjectId,
         first_name: String,
         last_name: String,
         is_active: Boolean,
      },
      presentation: {
         _id: mongoose.Schema.Types.ObjectId,
         title: String,
         order: Number,
         screenshot_sm_url: String,
         screenshot_md_url: String,
         slug: String,
         is_active: Boolean,
      },
   },
]

// @route      PATCH api/v1/event-presentations/:event-id
// @desc       Given an event, update presentations from the event-presentations resource
// @access     Public

const example_api_parameters = [
   {
      _id: mongoose.Schema.Types.ObjectId,
      order: Number,
      is_active: Boolean,
   },
]

const example_api_return_2 = [
   {
      member: {
         _id: mongoose.Schema.Types.ObjectId,
         first_name: String,
         last_name: String,
      },
      presentation: {
         _id: mongoose.Schema.Types.ObjectId,
         title: String,
         order: Number,
         is_active: Boolean,
      },
   },
]

module.exports = router
