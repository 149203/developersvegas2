const mongoose = require('mongoose')
const schema = mongoose.Schema

const event_schema = new schema({
   // row_id is for migration to SQL
   row_id: {
      type: Number, // auto-incremented ID
      required: true,
   },
   title: {
      type: String, // Demo Day
      default: 'Demo Day',
   },
   date: {
      type: Date,
      default: Date.now(),
   },
   slug: {
      type: String, // 'demo-day-2019-03-09'
      required: true,
   },
   is_active: {
      type: Boolean,
      default: true,
   },
})

module.exports = event = mongoose.model('events', event_schema)
