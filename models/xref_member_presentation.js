const mongoose = require('mongoose')
const schema = mongoose.Schema

const xref_member_presentation_schema = new schema({
   member_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'member',
   },
   presentation_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'presentation',
   },
})

module.exports = xref_member_presentation = mongoose.model(
   'xref_member_presentation',
   xref_member_presentation_schema
)
