const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// @route      GET api/v1/event-presentations/:event-id
// @desc       Given an event, read all presentations from the event-presentations resource
// @access     Public

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

const example_api_return = [
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

router.post('/', (req, res) => {
   console.log('Reached this API endpoint.')
})

module.exports = router
