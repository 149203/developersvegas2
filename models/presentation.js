const mongoose = require('mongoose')
const schema = mongoose.Schema

const presentation_schema = new schema({
   // row_id is for migration to SQL
   row_id: {
      type: Number, // auto-incremented ID
      required: true,
   },
   member_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'member',
   },
   title: {
      type: String,
      default: 'Untitled project',
   },
   signed_in_on: {
      type: Date,
      default: Date.now(),
   },
   order: {
      type: Number,
   },
   screenshot_sm_url: {
      type: String,
   },
   screenshot_md_url: {
      type: String,
   },
   screenshot_orig_url: {
      type: String,
   },
   slug: {
      type: String, // 'untitled-project-2' if this is the second 'untitled-project' by this member
   },
   is_active: {
      type: Boolean,
      required: true,
   },
})

module.exports = presentation = mongoose.model(
   'presentations',
   presentation_schema
)
