const express = require('express')
const router = express.Router()

// @route      POST api/v1/test
// @desc       Return what was posted to it
// @access     Public
router.post('/', async (req, res) => {
   res.json(req)
})

module.exports = router
