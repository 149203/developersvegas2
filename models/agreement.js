const mongoose = require('mongoose')
const schema = mongoose.Schema

const agreement_schema = new schema({
   title: {
      type: String,
      required: true,
   },
   version: {
      type: Number,
      required: true,
   },
   text: {
      type: String,
      required: true,
   },
   created_on: {
      type: Date,
      default: Date.now,
   },
   is_active: {
      type: Boolean,
      default: true,
   },
})

module.exports = agreement = mongoose.model('agreements', agreement_schema)
