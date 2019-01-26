const mongoose = require('mongoose')
const schema = mongoose.Schema

const technology_schema = new schema({
   id: {
      type: Number,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   popularity: {
      type: Number,
      default: 100,
   },
})

module.exports = technology = mongoose.model('technologies', technology_schema)
