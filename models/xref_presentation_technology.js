const mongoose = require('mongoose')
const schema = mongoose.Schema

const xref_presentation_technology_schema = new schema({
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

module.exports = xref_presentation_technology = mongoose.model(
   'xref_presentation_technology',
   xref_presentation_technology_schema
)
