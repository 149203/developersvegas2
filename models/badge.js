const mongoose = require('mongoose')
const schema = mongoose.Schema

const badge_schema = new schema({
   title: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   is_active: {
      type: Boolean,
      default: true,
   },
})

module.exports = badge = mongoose.model('badges', badge_schema)
