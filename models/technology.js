const mongoose = require('mongoose')
const schema = mongoose.Schema

const technology_schema = new schema({
   row_id: {
      type: Number, // auto-incremented ID
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   popularity: {
      type: Number,
      default: 10,
   },
   slug: {
      type: String,
      required: true,
   },
   is_active: {
      type: Boolean,
      default: true,
   },
})

module.exports = technology = mongoose.model('technologies', technology_schema)
