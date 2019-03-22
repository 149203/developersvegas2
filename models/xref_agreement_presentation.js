const mongoose = require('mongoose')
const schema = mongoose.Schema

const xref_agreement_presentation_schema = new schema({
   agreement_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'agreement',
   },
   presentation_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'presentation',
   },
})

module.exports = xref_agreement_presentation = mongoose.model(
   'xref_agreement_presentation',
   xref_agreement_presentation_schema
)
