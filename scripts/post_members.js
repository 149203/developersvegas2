const members = require('../data/members')
const axios = require('axios')
const fs = require('fs')
const _head = require('lodash/head')
const _take_right = require('lodash/takeRight')
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
            fs.appendFileSync(
               './logs/post_members.txt',
               `${JSON.stringify(new_member)} \n\n`,
               err => console.log(err)
            )
         })
   }
})

// post_to_members_collection(members)

function post_to_members_collection(members) {
   const member = _head(members)
   // the data has some null objects in it
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
            restart(members)
         })
         .catch(err => {
            console.log(err.response.data)
            fs.appendFileSync(
               './logs/post_members.txt',
               `${JSON.stringify(new_member)} \n\n`,
               err => console.log(err)
            )
            restart(members)
         })
   } else restart(members)
}

function restart(members) {
   const remaining_members = _take_right(members, members.length - 1)
   console.log(`${remaining_members.length} members remaining`)
   if (remaining_members.length > 0)
      post_to_members_collection(remaining_members)
}
