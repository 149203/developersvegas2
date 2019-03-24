const express = require('express')
const router = express.Router()
const developer = require('../../../models/member')

// @route      GET api/demo-days/test
// @desc       Tests the demo-days route
// @access     Public

router.get('/test', (req, res) =>
   res.json({
      msg: 'The demo-days route works.',
   })
)

// @route      GET api/demo-days/:months
// @desc       Gets all project and member info for the previous :months (number) of demo days
// @access     Public

module.exports = router
