const express = require('express')
const router = express.Router()
const event_model = require('../../../models/event')
const member_model = require('../../../models/member')
const presentation_model = require('../../../models/presentation')
const technology_model = require('../../../models/technology')
const xref_presentation_technology_model = require('../../../models/xref_presentation_technology')
const convert_undefined = require('../../../utils/convert_undefined')
const get_object_id = require('../../../utils/get_object_id')
const upsert = require('../../../utils/upsert')
const validate_input_for_presentation = require('../../../validation/presentation')
const cast_to_object_id = require('mongodb').ObjectID
const has = require('lodash/has')
const date_format = require('date-fns/format')
const to_lower = require('lodash/toLower')

// @route      POST api/v1/test
// @desc       Return what was posted to it
// @access     Public
router.post('/', async (req, res) => {
   res.json(req)
})

module.exports = router
