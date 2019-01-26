const express = require('express')
const router = express.Router()

// @route      GET api/projects/test
// @desc       Tests the projects route
// @access     Public
router.get('/test', (req, res) =>
   res.json({
      msg: 'The projects route works.',
   })
)

module.exports = router
