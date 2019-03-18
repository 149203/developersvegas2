const mongoose = require('mongoose')
const schema = mongoose.Schema

const member_badge_schema = new schema({
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

module.exports = member_badge = mongoose.model(
   'member_badges',
   member_badge_schema
)
