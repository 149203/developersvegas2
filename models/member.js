const mongoose = require('mongoose')
const schema = mongoose.Schema

const member_schema = new schema({
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

module.exports = member = mongoose.model('member', member_schema)
