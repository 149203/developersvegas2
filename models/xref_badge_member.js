const mongoose = require('mongoose')
const schema = mongoose.Schema

const xref_badge_member_schema = new schema({
   member_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'member',
   },
   badge_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'badge',
   },
})

module.exports = xref_badge_member = mongoose.model(
   'xref_badge_member',
   xref_badge_member_schema
)
