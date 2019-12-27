const mongoose = require('mongoose')
const schema = mongoose.Schema

const event_schema = new schema({
   title: {
      type: String, // Demo Day
      required: true,
   },
   started_on: {
      type: Number, // first 8 digits: date, next 4 digits: time
      required: true,
   },
   ended_on: {
      type: Number, // first 8 digits: date, next 4 digits: time
      required: true,
   },
   location_name: {
      type: String,
      required: true,
   },
   location_street_1: {
      type: String,
      required: true,
   },
   location_street_2: {
      type: String,
   },
   location_city: {
      type: String,
      required: true,
   },
   location_state: {
      type: String,
      required: true,
   },
   location_zip: {
      type: String,
      required: true,
   },
   location_url: {
      type: String,
      required: true,
   },
   cost: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   slug: {
      type: String,
      required: true,
   },
   is_active: {
      type: Boolean,
      default: true,
   },
})

module.exports = event = mongoose.model('events', event_schema)
