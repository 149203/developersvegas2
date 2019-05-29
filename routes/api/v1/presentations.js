const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const presentation_model = require('../../../models/presentation')
const slug_format = require('../../../utils/slug_format')
const append_slug_suffix = require('../../../utils/append_slug_suffix')
const create_row_id = require('../../../utils/create_row_id')
const validate_input_for_presentation = require('../../../validation/presentation')
const _has = require('lodash/has')

// @route      GET api/v1/presentations
// @desc       Gets all presentations
// @access     Public
router.get('/', (req, res) => {
   presentation_model
      .find()
      .then(presentations => {
         res.json(presentations)
      })
      .catch(err => console.log(err))
})

// @route      POST api/v1/presentations
// @desc       Create a new presentation in the presentations resource
// @access     Public
router.post('/', (req, res) => {
   const body = req.body
   // Validate user input
   const { errors, is_valid } = validate_input_for_presentation(body)
   if (!is_valid) {
      return res.status(400).json(errors)
   }

   const presentation_obj = {}
   // These are fields that can be updated via the API
   if (body.title) presentation_obj.title = body.title // String
   if (body.has_accepted_agreement)
      presentation_obj.has_accepted_agreement = body.has_accepted_agreement // Boolean, required
   if (body.order) presentation_obj.order = body.order // Number, required
   if (body.video_url) presentation_obj.video_url = body.video_url // String
   if (body.video_screenshot_url)
      presentation_obj.video_screenshot_url = body.video_screenshot_url // String
   if (body.signed_up_on) presentation_obj.signed_up_on = body.signed_up_on // Date, default now
   if (body.is_active) presentation_obj.is_active = body.is_active // Boolean, default true

   presentation_model
      .findById(body._id)
      .then(async presentation => {
         if (presentation) {
            // if we include an id in the request and it matches a document, update
            presentation_model
               .findByIdAndUpdate(
                  body._id,
                  { $set: presentation_obj },
                  { new: true }
               )
               .then(updated_presentation => res.json(updated_presentation))
               .catch(err => res.status(400).json(err))
         } else {
            // Create presentation
            let slug = slug_format(body.title || 'untitled-project') // 'title-of-presentation' or 'untitled-project'
            presentation_obj.slug = await append_slug_suffix(
               presentation_model,
               slug
            )
            presentation_obj.row_id = await create_row_id(presentation_model)

            if (!_has(presentation_obj, 'video_url'))
               presentation_obj.video_url = ''
            if (!_has(presentation_obj, 'video_screenshot_url'))
               presentation_obj.video_screenshot_url = ''

            new presentation_model(presentation_obj)
               .save()
               .then(presentation => {
                  res.json(presentation)
               })
               .catch(err => res.status(400).json(err))
         }
      })
      .catch(err => res.status(400).json(err))
})

const example_api_return = {
   _id: mongoose.Schema.Types.ObjectId,
   title: String,
   signed_up_on: Date,
   has_accepted_agreement: Boolean,
   order: Number,
   video_url: String,
   video_screenshot_url: String,
   is_active: Boolean,
   slug: String,
   row_id: Number,
}

module.exports = router
