const mongoose = require('mongoose')
const schema = mongoose.Schema

const xref_badge_member_schema = new schema({
   badge_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'badge',
   },
   member_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'member',
   },
})

module.exports = xref_badge_member = mongoose.model(
   'xref_badge_member',
   xref_badge_member_schema
)
