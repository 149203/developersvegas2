// This is a script to patch all objects in a collection
// It deletes the supplied property from all objects in a collection

require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')

// Databases
const development_db_uri = process.env.development_db_uri
const production_db_uri = process.env.production_db_uri

const collection = require('../models/presentation') // DEFINE YOUR COLLECTION FROM /models
const key = 'row_id' // DEFINE THE PROPERTY YOU WANT TO DELETE
const db = development_db_uri // SELECT DB

mongoose
   .connect(db)
   .then(() => {
      collection
         .updateMany({}, { $unset: { [key]: 1 } }, { strict: false }) // the 1 could be anything: https://stackoverflow.com/a/43391590
         // { strict: false } is needed for deleting keys: https://stackoverflow.com/a/30609148
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
