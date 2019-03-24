const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// @route      POST api/v1/presentations
// @desc       Create a new presentation in the presentations resource
// @access     Public

const example_api_parameters = {
   agreement_id: mongoose.Schema.Types.ObjectId,
   event_id: mongoose.Schema.Types.ObjectId,
   member_id: mongoose.Schema.Types.ObjectId,
   technologies: [
      {
         _id: mongoose.Schema.Types.ObjectId, // optional
      },
   ],
   title: String,
   has_accepted_agreement: Boolean,
   order: Number,
}

const example_api_return = {
   presentation_id: mongoose.Schema.Types.ObjectId,
   xref_agreement_presentation_id: mongoose.Schema.Types.ObjectId,
   xref_event_presentation_id: mongoose.Schema.Types.ObjectId,
   xref_member_presentation_id: mongoose.Schema.Types.ObjectId,
   xref_presentation_technology_id: mongoose.Schema.Types.ObjectId,
}

router.post('/', (req, res) => {
   console.log('Reached this API endpoint.')
})

module.exports = router
