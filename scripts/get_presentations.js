// write all presentations to a json file

// Imports
require('dotenv').config({ path: '../.env' })
const fs = require('fs')
const mongoose = require('mongoose')
const collection = require('../models/presentation') // DEFINE YOUR COLLECTION FROM /models
const member_model = require('../models/member')
const event_model = require('../models/event')

// Databases
const development_db_uri = process.env.development_db_uri
const production_db_uri = process.env.production_db_uri

// SELECT DATABASE
const db = production_db_uri

mongoose
   .connect(db)
   .then(async () => {
      await collection
         .find()
         .populate('member_id', ['first_name', 'last_name'], member_model)
         .populate('event_id', ['title', 'started_on'], event_model)
         .then(docs => {
            fs.writeFileSync('logs/presentations.json', JSON.stringify(docs))
            console.log(`${docs.length} items returned`)
            mongoose.disconnect()
         })
         .catch(err => {
            console.log(err)
            mongoose.disconnect()
         })
   })
   .catch(err => console.log(err))
