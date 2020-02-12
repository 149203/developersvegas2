// post an event to the events API

// Imports
require('dotenv').config({ path: '../.env' })
const axios = require('axios')
const convert_datetime_num_to_date = require('../utils/convert_datetime_num_to_date')

let server_url = 'http://localhost:3333'
// server_url = process.env.server_url_prod

// Change the event details
const event = {
   title: 'Demo Day',
   started_on: 202004111200,
   ended_on: 202004111500,
   cost: 'Free + free food!',
   description:
      "Demo Day is an open-mic-style event for coders to show and tell what they're working on and meet people. Sign up at noon. All ages, programming languages, and skill levels are welcome.",
   location_name: 'PunchCode',
   location_street_1: '1112 S Casino Center Blvd',
   location_street_2: '',
   location_city: 'Las Vegas',
   location_state: 'NV',
   location_zip: '89104',
   location_url: 'https://punchcode.org/',
}

console.log(convert_datetime_num_to_date(event.started_on))
post_event(event)

function post_event(event) {
   console.log(event)
   axios
      .post(`${server_url}/api/v1/events`, event)
      .then(res => {
         console.log('Back from the API:', res.data)
      })
      .catch(err => console.log('ERROR:', err.response))
}

// const upserted_event = async () => {
//    await upsert({
//       payload,
//       collection: presentation_model,
//       options: {
//          should_create_slug: true,
//          should_create_row_id: false,
//          slug_fields, // an array of strings, in order
//       },
//       filter: { event_id, member_id }, // only one presentation per member per event, therefore if they try to insert another presentation, it will upsert over their previous one
//    })
// }

// mongoose
//    .connect(db)
//    .then(async () => {
//       await collection
//          .find()
//          .then(docs => {
//             console.log(docs)
//             mongoose.disconnect()
//          })
//          .catch(err => {
//             console.log(err)
//             mongoose.disconnect()
//          })
//    })
//    .catch(err => console.log(err))
