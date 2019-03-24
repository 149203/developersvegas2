const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// @route      GET api/v1/event-presentations/:event-id
// @desc       Given an event, read all presentations from the event-presentations resource
// @access     Public

const example_api_return = [
   {
      member: {
         member_id: mongoose.Schema.Types.ObjectId,
         member_first_name: String,
         member_last_name: String,
      },
      presentation: {
         _id: mongoose.Schema.Types.ObjectId,
         row_id: Number,
         title: String,
         signed_up_on: Date,
         has_accepted_agreement: Boolean,
         order: Number,
         screenshot_sm_url: String,
         screenshot_md_url: String,
         screenshot_orig_url: String,
         slug: String,
         is_active: Boolean,
      },
   },
]

// @route      PUT api/v1/event-presentations/:event-id
// @desc       Given an event, update presentations from the event-presentations resource
// @access     Public

const example_api_parameters = {
   row_id: Number,
   title: String,
   signed_up_on: Date,
   has_accepted_agreement: Boolean,
   order: Number,
   screenshot_sm_url: String,
   screenshot_md_url: String,
   screenshot_orig_url: String,
   slug: String,
   is_active: Boolean,
}

const example_api_return = [
   {
      member: {
         member_id: mongoose.Schema.Types.ObjectId,
         member_first_name: String,
         member_last_name: String,
      },
      presentation: {
         _id: mongoose.Schema.Types.ObjectId,
         row_id: Number,
         title: String,
         signed_up_on: Date,
         has_accepted_agreement: Boolean,
         order: Number,
         screenshot_sm_url: String,
         screenshot_md_url: String,
         screenshot_orig_url: String,
         slug: String,
         is_active: Boolean,
      },
   },
]

router.post('/', (req, res) => {
   console.log('Reached this API endpoint.')
})

module.exports = router
