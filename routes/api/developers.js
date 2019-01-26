const express = require('express')
const router = express.Router()
const developer = require('../../models/developer')
const _pick = require('lodash/pick')

// @route      GET api/developers/test
// @desc       Tests the developers route
// @access     Public
router.get('/test', (req, res) =>
   res.json({
      msg: 'The developers route works.',
   })
)

// @route      api/developers/upsert
// @desc       Upserts a developer
// @access     Public
router.post('/upsert', (req, res) => {
   const { first_name, last_name, email, id } = req.body
   const new_developer = new developer({
      first_name,
      last_name,
      email,
      id,
   }) // create a new developer with the info from the req body
   console.log(new_developer)

   developer
      .findOneAndUpdate(
         {
            email: req.body.email,
         },
         select_properties(new_developer), // UGLY: There's got to be a better way to upsert everything but the _id
         { upsert: true, new: true, setDefaultsOnInsert: true },
         () => {
            console.log('UPSERTED')
         }
      )
      .then(developer => {
         res.json(developer)
      })
      .catch(err => console.log(err))
})

function select_properties(document) {
   return _pick(document, [
      'id',
      'first_name',
      'last_name',
      'email',
      'portfolio_url',
      'photo_url_sm',
      'photo_url_md',
      'photo_url_orig',
   ])
}

module.exports = router
