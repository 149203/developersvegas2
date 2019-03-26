const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// @route      POST api/v1/technologies
// @desc       Create a new technology in the technologies resource
// @access     Public

const example_api_parameters = {
   name: String,
   popularity: Number, // optional
}

const example_api_return = {
   _id: mongoose.Schema.Types.ObjectId,
   row_id: Number,
   name: String,
   popularity: Number,
   slug: String,
   is_active: Boolean,
}

router.post('/', (req, res) => {
   console.log('Reached this API endpoint.')
})

module.exports = router
