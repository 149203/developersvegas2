// print out all members that are in firebase but not in mongo db

// Imports
require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')
const members = require('../data/members')
const collection = require('../models/member') // DEFINE YOUR COLLECTION FROM /models
const xor = require('lodash/xor')
const includes = require('lodash/includes')

// Databases
const development_db_uri = process.env.development_db_uri
const production_db_uri = process.env.production_db_uri

// SELECT DATABASE
const db = production_db_uri

console.log('script started')

const firebase_emails = members.map(member => member.email)

mongoose
   .connect(db)
   .then(async () => {
      await collection
         .find()
         .then(docs => {
            const mlab_emails = docs.map(doc => doc.email)
            const xors = xor(firebase_emails, [...mlab_emails])
            members.forEach(member => {
               if (includes(xors, member.email)) {
                  console.log(member)
               }
            })
            mongoose.disconnect()
         })
         .catch(err => {
            console.log(err)
            mongoose.disconnect()
         })
   })
   .catch(err => console.log(err))
