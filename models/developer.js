const mongoose = require('mongoose')
const schema = mongoose.Schema

const developer_schema = new schema({
   id: {
      type: Number,
      required: true,
   },
   first_name: {
      type: String,
      required: true,
   },
   last_name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   portfolio_url: {
      type: String,
   },
   photo_url_sm: {
      type: String,
   },
   photo_url_md: {
      type: String,
   },
   photo_url_orig: {
      type: String,
   },
})

module.exports = developer = mongoose.model('developers', developer_schema)
