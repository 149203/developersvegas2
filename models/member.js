const mongoose = require('mongoose')
const schema = mongoose.Schema

const member_schema = new schema({
   // row_id is for migration to SQL
   row_id: {
      type: Number, // auto-incremented ID
      required: true,
   },
   first_name: {
      type: String,
      required: true,
   },
   last_name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   portfolio_url: {
      type: String,
   },
   profile_photo_url: {
      type: String,
   },
   joined_on: {
      type: Date,
      default: Date.now,
   },
   bio: {
      type: String,
   },
   slug: {
      type: String, // 'mike-zetlow-2' if this is the second 'mike-zetlow'
      required: true,
   },
   is_active: {
      type: Boolean,
      default: true,
   },
})

module.exports = member = mongoose.model('members', member_schema)
