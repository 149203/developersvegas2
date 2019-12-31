const mongoose = require('mongoose')

const presentation_schema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      max: 80,
   },
   signed_up_on: {
      type: Date,
      default: Date.now,
   },
   event_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'event',
   },
   member_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'member',
   },
   agreement_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'agreement',
   },
   has_accepted_agreement: {
      type: Boolean,
      required: true,
   },
   order: {
      type: Number,
   },
   is_featured: {
      type: Boolean,
   },
   video_id: {
      type: String, // Vimeo uses numbers, but YouTube uses a mix of characters
   },
   video_screenshot_url: {
      type: String,
   },
   video_screenshot_with_play_url: {
      type: String,
   },
   video_url: {
      type: String,
   },
   video_iframe: {
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
