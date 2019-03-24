const express = require('express')
const router = express.Router()
const member = require('../../../models/member')
const _pick = require('lodash/pick')
const _map = require('lodash/map')
const _random = require('lodash/random')

// @route      GET api/members/test
// @desc       Tests the developers route
// @access     Public
router.get('/test', (req, res) =>
   res.json({
      msg: 'The members route works.',
   })
)

// @route      GET api/members
// @desc       Gets all members
// @access     Public
router.get('/', (req, res) => {
   member
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

// @route      POST api/members
// @desc       Upserts a member
// @access     Public
router.post('/', (req, res) => {
   const { first_name, last_name, email, portfolio_url } = req.body
   const new_member = new member({
      first_name,
      last_name,
      email,
      portfolio_url,
   })

   member
      .findOneAndUpdate(
         {
            email: req.body.email, // if the email matches. TODO: check by _id
         },
         select_properties(new_member), // UGLY: There's got to be a better way to upsert everything but the _id
         { upsert: true, new: true, setDefaultsOnInsert: true },
         () => {
            console.log('UPSERTED')
         }
      )
      .then(member => {
         res.json(member)
      })
      .catch(err => console.log(err))
})

function select_properties(member) {
   return _pick(member, [
      'first_name',
      'last_name',
      'email',
      'portfolio_url',
      'photo_url_sm',
      'photo_url_md',
      'photo_url_orig',
   ])
}

function mask_email(email) {
   let email_masked = null
   if (email) {
      const local_part = email.slice(0, email.lastIndexOf('@') + 1)
      const domain = email.slice(email.lastIndexOf('@'))
      email_masked = local_part.slice(0, -_random(3, 6)) + '*****' + domain
   }
   return email_masked
}

module.exports = router
