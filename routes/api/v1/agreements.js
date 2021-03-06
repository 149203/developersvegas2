const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const agreement_model = require('../../../models/agreement')
const create_row_id = require('../../../utils/create_row_id')
const validate_input_for_agreement = require('../../../validation/agreement')

// @route      GET api/v1/agreements
// @desc       Gets all agreements
// @access     Public
router.get('/', (req, res) => {
   agreement_model
      .find()
      .then(agreements => {
         res.json(agreements)
      })
      .catch(err => console.log(err))
})

// @route      GET api/v1/agreements/latest
// @desc       Gets the latest agreement
// @access     Public
router.get('/latest/', (req, res) => {
   agreement_model
      .findOne()
      .sort({ version: 'desc' })
      .then(agreement => {
         res.json(agreement)
      })
      .catch(err => console.log(err))
})

// @route      POST api/v1/agreements
// @desc       Create a new agreement in the agreements resource
// @access     Public
router.post('/', (req, res) => {
   const body = req.body
   // Validate user input
   const { errors, is_valid } = validate_input_for_agreement(body)
   if (!is_valid) {
      return res.status(400).json(errors)
   }

   const agreement_obj = {}
   // These are fields that can be updated via the API
   if (body.title) agreement_obj.title = body.title // String, required
   if (typeof body.version !== 'undefined') agreement_obj.version = body.version // Number, required
   if (body.text) agreement_obj.text = body.text // String, required
   if (body.created_on) agreement_obj.created_on = body.created_on // Date, default Date.now
   if (typeof body.is_active !== 'undefined')
      agreement_obj.is_active = body.is_active // Boolean, default true

   agreement_model
      .findById(body._id)
      .then(async agreement => {
         if (agreement) {
            // if we include an id in the request and it matches a document, update
            agreement_model
               .findByIdAndUpdate(
                  body._id,
                  { $set: agreement_obj },
                  { new: true }
               )
               .then(updated_agreement => res.json(updated_agreement))
               .catch(err => res.status(400).json(err))
         } else {
            // Create agreement
            agreement_obj.row_id = await create_row_id(agreement_model)

            new agreement_model(agreement_obj)
               .save()
               .then(agreement => {
                  res.json(agreement)
               })
               .catch(err => res.status(400).json(err))
         }
      })
      .catch(err => res.status(400).json(err))
})

const example_api_return = {
   _id: mongoose.Schema.Types.ObjectId,
   row_id: Number,
   title: String,
   version: String,
   text: String,
   created_on: Date,
   is_active: Boolean,
}

module.exports = router
