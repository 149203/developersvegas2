const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// @route      POST api/v1/events
// @desc       Create a new event in the events resource
// @access     Public

const example_api_parameters = {
   title: String, // optional
   date: Date, // optional
}

const example_api_return = {
   _id: mongoose.Schema.Types.ObjectId,
   row_id: Number,
   title: String,
   date: Date,
   slug: String,
   is_active: Boolean,
}

router.post('/', (req, res) => {
   console.log('Reached this API endpoint.')
})

module.exports = router
