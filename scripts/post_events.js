// post an event to the events API

// Imports
require('dotenv').config({ path: '../.env' })
const axios = require('axios')
const convert_datetime_num_to_date = require('../utils/convert_datetime_num_to_date')

let server_url = 'http://localhost:3333'
server_url = process.env.server_url_prod

let _id = null
// _id = '5e44448f3bf60560d8104c97' // if you include an id, it will update the existing document

// Change the event details
const event = {
   _id,
   title: 'Demo Day',
   started_on: 202007101400,
   ended_on: 202007101700,
   cost: 'Free!',
   description:
      "Demo Day is an open-mic-style event for coders to show and tell what they're working on and meet people. All ages, programming languages, and skill levels are welcome.",
   location_name: 'Online!',
   location_street_1: 'Join the Las Vegas Developers Slack Channel',
   location_street_2: '',
   location_city: 'Las Vegas',
   location_state: 'NV',
   location_zip: '89101',
   location_url:
      'https://join.slack.com/t/lasvegasdevelopers/shared_invite/enQtOTQyODg1NzIyNDY0LTVjMjYzNDkwMjYxMmZjMTZhM2UwZjY5ZTZlODE3NDNjZWM3Yjg4MTk0YjNiZDlkMzkyNTRlOWI3OGJjY2U1MTc',
}

console.log(convert_datetime_num_to_date(event.started_on))

post_event(event)

function post_event(event) {
   console.log(event)
   axios
      .post(`${server_url}/api/v1/events`, event)
      .then((res) => {
         console.log('Back from the API:', res.data)
      })
      .catch((err) => console.log('ERROR:', err.response))
}
