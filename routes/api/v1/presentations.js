const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const presentation_model = require('../../../models/presentation')
const _kebab_case = require('lodash/kebabCase')
const append_slug_suffix = require('../../../utils/append_slug_suffix')
const create_row_id = require('../../../utils/create_row_id')

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
   // Validate user input
   // const { errors, is_valid } = validate_input_for_member(req.body)
   // if (!is_valid) {
   //    return res.status(400).json(errors)
   // }

   const presentation_obj = {}
   const body = req.body
   // These are fields that can be updated via the API
   if (body.title) presentation_obj.title = body.title // String
   if (body.has_accepted_agreement)
      presentation_obj.has_accepted_agreement = body.has_accepted_agreement // Boolean, required
   if (body.order) presentation_obj.order = body.order // Number, required
   if (body.video_url) presentation_obj.video_url = body.video_url // String, required
   if (body.video_screenshot_url)
      presentation_obj.video_screenshot_url = body.video_screenshot_url // String, required
   if (body.is_active) presentation_obj.is_active = body.is_active // Boolean, default true

   presentation_model
      .findById(body._id)
      .then(async presentation => {
         if (presentation) {
            // if we include an id in the request, update
            presentation_model
               .findByIdAndUpdate(
                  body._id,
                  { $set: presentation_obj },
                  { new: true }
               ) // TODO: Use findByIdAndUpdate with upsert: true
               .then(updated_presentation => res.json(updated_presentation))
               .catch(err => res.status(400).json(err))
         } else {
            // Create presentation
            console.log(presentation_obj)
            let slug = _kebab_case(body.title) // john-smith
            presentation_obj.slug = await append_slug_suffix(
               presentation_model,
               slug
            )
            presentation_obj.row_id = await create_row_id(presentation_model)
            // if (!_has(presentation_obj, 'video_screenshot_url'))
            //    presentation_obj.video_screenshot_url = ''
            // if (!_has(presentation_obj, 'profile_photo_url'))
            //    presentation_obj.profile_photo_url = ''
            // if (!_has(presentation_obj, 'bio')) presentation_obj.bio = ''

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
   row_id: Number,
   first_name: String,
   last_name: String,
   email: String,
   portfolio_url: String,
   profile_photo_url: String,
   joined_on: Date,
   bio: String,
   slug: String,
   is_active: Boolean,
}

router.post('/', (req, res) => {
   console.log('Reached this API endpoint.')
})

module.exports = router
