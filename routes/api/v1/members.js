const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const member_model = require('../../../models/member')
const _map = require('lodash/map')
const _random = require('lodash/random')
const _is_finite = require('lodash/isFinite')
const _to_number = require('lodash/toNumber')
const _to_lower = require('lodash/toLower')
const _has = require('lodash/has')
const validate_input_for_member = require('../../../validation/member')

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
   // Validate user input
   const { errors, is_valid } = validate_input_for_member(req.body)
   if (!is_valid) {
      return res.status(400).json(errors)
   }

   const member_obj = {}
   const body = req.body
   // These are fields that can be updated via the API
   if (body.first_name) member_obj.first_name = body.first_name // String, required
   if (body.last_name) member_obj.last_name = body.last_name // String, required
   if (body.email) member_obj.email = body.email // String, required
   if (body.portfolio_url) member_obj.portfolio_url = body.portfolio_url // String
   if (body.profile_photo_url)
      member_obj.profile_photo_url = body.profile_photo_url // String
   if (body.bio) member_obj.bio = body.bio // String
   if (body.is_active) member_obj.is_active = body.is_active // Boolean, default true

   member_model
      .findById(body._id)
      .then(async member => {
         if (member) {
            // if we include an id in the request, update
            member_model
               .findByIdAndUpdate(body._id, { $set: member_obj }, { new: true }) // TODO: Use findByIdAndUpdate with upsert: true
               .then(updated_member => res.json(updated_member))
               .catch(err => res.status(400).json(err))
         } else {
            // Create member
            let slug = _to_lower(`${body.first_name}-${body.last_name}`) // john-smith
            member_obj.slug = await append_slug_suffix(slug)
            member_obj.row_id = await create_row_id()
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

function create_row_id() {
   return member_model
      .findOne({})
      .sort({ row_id: -1 }) // find the row_id with the highest num
      .then(member => {
         if (member) {
            return member.row_id + 1
         } else return 1 // this is the first document in this collection, row_id: 1
      })
      .catch(err => console.log(err))
}

function append_slug_suffix(slug) {
   return member_model
      .findOne({ slug })
      .then(member => {
         if (!member) {
            // slug wasn't found, it's unique
            return slug
         } else {
            let slug_prefix = slug.slice(0, slug.lastIndexOf('-') + 1)
            let slug_suffix = _to_number(slug.slice(slug.lastIndexOf('-') + 1))
            if (_is_finite(slug_suffix)) {
               slug_suffix += 1
               return append_slug_suffix(slug_prefix + slug_suffix)
            } else {
               return append_slug_suffix(`${slug}-2`)
            }
         }
      })
      .catch(err => console.log(err))
}

function mask_email(email) {
   let email_masked = ''
   if (email) {
      const local_part = email.slice(0, email.lastIndexOf('@') + 1)
      const domain = email.slice(email.lastIndexOf('@'))
      email_masked = local_part.slice(0, -_random(3, 6)) + '*****' + domain
   }
   return email_masked
}

module.exports = router
