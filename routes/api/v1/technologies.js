const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const technology_model = require('../../../models/technology')
const create_row_id = require('../../../utils/create_row_id')
const validate_input_for_technology = require('../../../validation/technology')
const slug_format = require('../../../utils/slug_format')
const append_slug_suffix = require('../../../utils/append_slug_suffix')

// @route      GET api/v1/technologies
// @desc       Gets all technologies
// @access     Public
router.get('/', (req, res) => {
   technology_model
      .find()
      .sort({ popularity: 'desc', name: 'asc' })
      .then(technologies => {
         res.json(technologies)
      })
      .catch(err => console.log(err))
})

// @route      POST api/v1/technologies
// @desc       Create a new technology in the technologies resource
// @access     Public
router.post('/', (req, res) => {
   const body = req.body
   // Validate user input
   const { errors, is_valid } = validate_input_for_technology(body)
   if (!is_valid) {
      return res.status(400).json(errors)
   }

   const technology_obj = {}
   // These are fields that can be updated via the API
   if (body.name) technology_obj.name = body.name // String, required
   if (body.popularity !== undefined)
      technology_obj.popularity = body.popularity // Number, default 10
   if (body.row_id) technology_obj.row_id = body.row_id // String
   if (body.is_active !== undefined) technology_obj.is_active = body.is_active // Boolean, default true

   technology_model
      .findById(body._id)
      .then(async technology => {
         if (technology) {
            // if we include an id in the request and it matches a document, update
            technology_model
               .findByIdAndUpdate(
                  body._id,
                  { $set: technology_obj },
                  { new: true }
               )
               .then(updated_technology => res.json(updated_technology))
               .catch(err => res.status(400).json(err))
         } else {
            // Create technology
            let slug = slug_format(body.name) // 'name-of-technology'
            technology_obj.slug = await append_slug_suffix(
               technology_model,
               slug
            )
            if (!body.row_id) {
               technology_obj.row_id = await create_row_id(technology_model)
            }

            new technology_model(technology_obj)
               .save()
               .then(technology => {
                  res.json(technology)
               })
               .catch(err => res.status(400).json(err))
         }
      })
      .catch(err => res.status(400).json(err))
})

const example_api_return = {
   _id: mongoose.Schema.Types.ObjectId,
   row_id: Number,
   name: String,
   popularity: Number,
   slug: String,
   is_active: Boolean,
}

module.exports = router
