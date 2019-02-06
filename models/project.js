const mongoose = require('mongoose')
const schema = mongoose.Schema

const project_schema = new schema({
   member: {
      type: ObjectId, // this may not be correct
      required: true,
   },
   title: {
      type: String,
      default: 'Untitled project',
   },
   url: {
      type: String,
   },
   date: {
      type: Date,
      default: Date.now(),
   },
   order: {
      type: Number,
   },
   technology_1: {
      type: Number,
   },
   technology_2: {
      type: Number,
   },
   technology_3: {
      type: Number,
   },
   screenshot_url_sm: {
      type: String,
   },
   screenshot_url_md: {
      type: String,
   },
   screenshot_url_orig: {
      type: String,
   },
})

module.exports = project = mongoose.model('projects', project_schema)
