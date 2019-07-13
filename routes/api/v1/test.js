const express = require('express')
const router = express.Router()

// @route      POST api/v1/test
// @desc       Return what was posted to it
// @access     Public
router.post('/', (req, res) => {
   res.json(req.body)
})

module.exports = router
