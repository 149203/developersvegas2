const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// @route      POST api/v1/attendees
// @desc       Create a new attendee in the attendees resource
// @access     Public

const example_api_parameters = {
   event_id: mongoose.Schema.Types.ObjectId,
   member_id: mongoose.Schema.Types.ObjectId,
}

const example_api_return = {
   xref_event_member_id: mongoose.Schema.Types.ObjectId,
   event_id: mongoose.Schema.Types.ObjectId,
   member_id: mongoose.Schema.Types.ObjectId,
}

router.post('/', (req, res) => {
   console.log('Reached this API endpoint.')
})

module.exports = router
