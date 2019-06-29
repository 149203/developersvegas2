const express = require('express')
const router = express.Router()
const member_model = require('../../../models/member')
const _map = require('lodash/map')
const _has = require('lodash/has')
const validate_input_for_member = require('../../../validation/member')
const append_slug_suffix = require('../../../utils/append_slug_suffix')
const create_row_id = require('../../../utils/create_row_id')
const mask_email = require('../../../utils/mask_email')
const slug_format = require('../../../utils/slug_format')

// @route      GET api/v1/members
// @desc       Gets all members
// @access     Public
router.get('/', (req, res) => {
   member_model
      .find()
      .then(members => {
         const formatted_members = _map(members, member => {
            member.email = mask_email(member.email)
            return member
         })
         res.json(formatted_members)
      })
      .catch(err => console.log(err))
})

// @route      POST api/v1/members
// @desc       Create a new member in the members resource
// @access     Public
router.post('/', (req, res) => {
   const body = req.body
   // Validate user input
   const { errors, is_valid } = validate_input_for_member(body)
   if (!is_valid) {
      return res.status(400).json(errors)
   }

   const member_obj = {}
   // These are fields that can be updated via the API
   if (body.first_name) member_obj.first_name = body.first_name // String, required
   if (body.last_name) member_obj.last_name = body.last_name // String, required
   if (body.email) member_obj.email = body.email // String, required
   if (body.row_id) member_obj.row_id = body.row_id // String
   if (body.portfolio_url) member_obj.portfolio_url = body.portfolio_url // String
   if (body.profile_photo_url)
      member_obj.profile_photo_url = body.profile_photo_url // String
   if (body.bio) member_obj.bio = body.bio // String
   if (body.joined_on) member_obj.joined_on - body.joined_on // Date, default now
   if (body.is_active) member_obj.is_active = body.is_active // Boolean, default true

   member_model
      .findById(body._id)
      .then(async member => {
         if (member) {
            // if we include an id in the request, update
            member_model
               .findByIdAndUpdate(body._id, { $set: member_obj }, { new: true })
               .then(updated_member => res.json(updated_member))
               .catch(err => res.status(400).json(err))
         } else {
            // Create member
            let slug = slug_format(`${body.first_name}-${body.last_name}`) // john-smith
            member_obj.slug = await append_slug_suffix(member_model, slug)
            if (!body.row_id) {
               member_obj.row_id = await create_row_id(member_model)
            }
            if (!_has(member_obj, 'portfolio_url'))
               member_obj.portfolio_url = ''
            if (!_has(member_obj, 'profile_photo_url'))
               member_obj.profile_photo_url = ''
            if (!_has(member_obj, 'bio')) member_obj.bio = ''
            new member_model(member_obj)
               .save()
               .then(member => {
                  res.json(member)
               })
               .catch(err => res.status(400).json(err))
         }
      })
      .catch(err => res.status(400).json(err))
})

const example_api_return = {
   _id: 'ObjectId',
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

module.exports = router
