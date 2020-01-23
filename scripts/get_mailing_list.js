// create a csv of all members for Mailchimp

// Imports
require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')
const collection = require('../models/member') // DEFINE YOUR COLLECTION FROM /models
const concat = require('lodash/concat')
const flatten = require('lodash/flatten')
const fs = require('fs')

// Databases
const development_db_uri = process.env.development_db_uri
const production_db_uri = process.env.production_db_uri

// SELECT DATABASE
const db = production_db_uri

console.log('script started')

mongoose
   .connect(db)
   .then(async () => {
      await collection
         .find()
         .then(members => {
            const members_arr = members.map((member, i) => {
               if (!member.first_name) member.first_name = ''
               if (!member.last_name) member.last_name = ''
               if (!member.email) member.email = ''
               if (i === 0) {
                  return [member.first_name, member.last_name, member.email]
               } else
                  return [
                     `\n${member.first_name}`,
                     member.last_name,
                     member.email,
                  ]
            })
            let mailing_list = flatten(members_arr)
            fs.writeFileSync('logs/mailing_list.csv', mailing_list)
            mongoose.disconnect()
         })
         .catch(err => {
            console.log(err)
            mongoose.disconnect()
         })
   })
   .catch(err => console.log(err))
