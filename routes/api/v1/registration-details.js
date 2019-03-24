const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// @route      GET api/v1/registration-details
// @desc       Read all the information needed to register to this event
// @access     Public

const example_api_return = {
   agreement: {
      _id: mongoose.Schema.Types.ObjectId,
      title: String,
      version: String,
      text: String,
      created_on: Date,
      is_active: Boolean,
   },
   event: {
      _id: mongoose.Schema.Types.ObjectId,
      title: String,
      date: Date,
      is_active: Boolean,
   },
   members: [
      {
         _id: mongoose.Schema.Types.ObjectId,
         first_name: String,
         last_name: String,
         email_masked: String,
         profile_photo_sm_url: String,
         number_of_events: Number,
         number_of_presentations: Number,
         is_active: Boolean,
      },
   ],
   technologies: [
      {
         _id: mongoose.Schema.Types.ObjectId,
         name: String,
         popularity: Number,
         is_active: Boolean,
      },
   ],
}

router.post('/', (req, res) => {
   console.log('Reached this API endpoint.')
})

module.exports = router
