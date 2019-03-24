const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// @route      POST api/v1/agreements
// @desc       Create a new agreement in the agreements resource
// @access     Public

const example_api_parameters = {
   title: String,
   version: String,
   text: String,
   created_on: Date, // optional
}

const example_api_return = {
   _id: mongoose.Schema.Types.ObjectId,
   row_id: Number,
   title: String,
   version: String,
   text: String,
   created_on: Date,
   is_active: Boolean,
}

router.post('/', (req, res) => {
   console.log('Reached this API endpoint.')
})

module.exports = router
