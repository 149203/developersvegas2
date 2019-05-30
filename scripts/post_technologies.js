const technologies = require('../data/technologies')

const axios = require('axios')
const fs = require('fs')
const _trim = require('lodash/trim')
const _for_each = require('lodash/forEach')

const server_url = 'http://localhost:3333'

_for_each(technologies, technology => {
   if (technology) {
      const new_technology = {
         name: _trim(technology.name),
         popularity: _trim(technology.popularity),
         row_id: _trim(technology.id),
      }
      axios
         .post(`${server_url}/api/v1/technologies`, new_technology)
         .then(res => {
            console.log(res.data)
         })
         .catch(err => {
            console.log(err.response.data)
            fs.appendFile(
               './logs/post_technologies.txt',
               `${JSON.stringify(new_technology)} \n\n`,
               err => console.log(err)
            )
         })
   }
})
