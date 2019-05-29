const members = require('../data/members')
const axios = require('axios')
const fs = require('fs')
const _trim = require('lodash/trim')
const _for_each = require('lodash/forEach')

const server_url = 'http://localhost:3333'

_for_each(members, member => {
   if (member) {
      const new_member = {
         first_name: _trim(member.first_name),
         last_name: _trim(member.last_name),
         email: _trim(member.email),
         row_id: member._id,
         portfolio_url: _trim(member.portfolio),
      }
      axios
         .post(`${server_url}/api/v1/members`, new_member)
         .then(res => {
            console.log(res.data)
         })
         .catch(err => {
            console.log(err.response.data)
            fs.appendFile(
               './logs/post_members.txt',
               `${JSON.stringify(new_member)} \n\n`,
               err => console.log(err)
            )
         })
   }
})
