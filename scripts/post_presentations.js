const demo_day_presentations = require('../data/presentations-2019-07-13-vimeo.json')
const axios = require('axios')

const server_url = 'http://localhost:3333'

post_json(JSON.stringify(demo_day_presentations))

function post_json(demo_day_presentations) {
   axios
      .post(`${server_url}/api/v1/presentations/all-deprecated`, {
         demo_day_presentations,
      })
      .then(res => {
         console.log('Back from the API:', res.data)
      })
      .catch(err => console.log(err.response.data))
}
