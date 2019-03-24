const express = require('express')
const router = express.Router()

// @route      GET api/technologies/test
// @desc       Tests the technologies route
// @access     Public
router.get('/test', (req, res) =>
   res.json({
      msg: 'The technologies route works.',
   })
)

module.exports = router
