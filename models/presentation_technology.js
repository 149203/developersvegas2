const mongoose = require('mongoose')
const schema = mongoose.Schema

const presentation_technology_schema = new schema({
   presentation_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'presentation',
   },
   technology_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'technology',
   },
})

module.exports = presentation_technology = mongoose.model(
   'presentation_technologies',
   presentation_technology_schema
)
