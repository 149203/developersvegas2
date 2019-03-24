const mongoose = require('mongoose')
const schema = mongoose.Schema

const xref_event_presentation_schema = new schema({
   event_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'event',
   },
   presentation_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'presentation',
   },
})

module.exports = xref_event_presentation = mongoose.model(
   'xref_event_presentation',
   xref_event_presentation_schema
)
