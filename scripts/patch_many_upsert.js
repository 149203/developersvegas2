// This is a script to patch all objects in a collection
// It upserts the supplied property into all objects in a collection

require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')

// Databases
const development_db_uri = process.env.development_db_uri
const production_db_uri = process.env.production_db_uri

const collection = require('../models/presentation') // DEFINE YOUR COLLECTION FROM /models
const property = { is_featured: false } // DEFINE THE PROPERTY YOU WANT TO UPSERT
const db = development_db_uri // SELECT DB

mongoose
   .connect(db)
   .then(() => {
      collection
         .updateMany({}, { $set: property }, { upsert: true })
         .then(docs => {
            console.log(docs)
            mongoose.disconnect()
         })
         .catch(err => {
            console.log(err)
            mongoose.disconnect()
         })
   })
   .catch(err => console.log(err))
