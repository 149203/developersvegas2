const express = require('express')
const router = express.Router()

// @route      GET api/developers/test
// @desc       Tests the developers route
// @access     Public
router.get('/test', (req, res) =>
   res.json({
      msg: 'The developers route works.',
   })
)

module.exports = router
