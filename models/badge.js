const mongoose = require('mongoose')
const schema = mongoose.Schema

const badge_schema = new schema({
   // row_id is for migration to SQL
   row_id: {
      type: Number, // auto-incremented ID
      required: true,
   },
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
