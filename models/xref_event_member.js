const mongoose = require('mongoose')
const schema = mongoose.Schema

const xref_event_member_schema = new schema({
   event_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'event',
   },
   member_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'member',
   },
})

module.exports = xref_event_member = mongoose.model(
   'xref_event_member',
   xref_event_member_schema
)
