const mongoose = require('mongoose')
const schema = mongoose.Schema

const accepted_agreement_schema = new schema({
   // row_id is for migration to SQL
   row_id: {
      type: Number, // auto-incremented ID
      required: true,
   },
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
   accepted_on: {
      type: Date,
      required: true,
   },
})

module.exports = accepted_agreement = mongoose.model(
   'accepted_agreements',
   accepted_agreement_schema
)
