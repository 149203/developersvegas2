const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// @route      POST api/v1/members
// @desc       Create a new member in the members resource
// @access     Public

const example_api_parameters = {
   first_name: String,
   last_name: String,
   email: String,
   portfolio_url: String, // optional
   profile_photo_orig_url: String, // optional
   joined_on: Date, // optional
   bio: String, // optional
}

const example_api_return = {
   _id: mongoose.Schema.Types.ObjectId,
   row_id: Number,
   first_name: String,
   last_name: String,
   email: String,
   portfolio_url: String,
   profile_photo_orig_url: String,
   profile_photo_sm_url: String,
   joined_on: Date,
   bio: String,
   slug: String,
   is_active: Boolean,
}

router.post('/', (req, res) => {
   console.log('Reached this API endpoint.')
})

module.exports = router
