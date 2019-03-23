const mongoose = require('mongoose')
const schema = mongoose.Schema

const presentation_schema = new schema({
   // row_id is for migration to SQL
   row_id: {
      type: Number, // auto-incremented ID
      required: true,
   },
   title: {
      type: String,
      default: 'Untitled project',
      max: 80,
   },
   signed_in_on: {
      type: Date,
      default: Date.now(),
   },
   has_accepted_agreement: {
      type: Boolean,
      required: true,
   },
   order: {
      type: Number,
      required: true,
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
      type: String, // 'untitled-project-2019-03-09'
      required: true,
   },
   is_active: {
      type: Boolean,
      default: true,
   },
})

module.exports = presentation = mongoose.model(
   'presentations',
   presentation_schema
)
