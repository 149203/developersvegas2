const has = require('lodash/has')
const is_empty = require('lodash/isEmpty')
const mongoose = require('mongoose')
const slug_format = require('./slug_format')
const append_slug_suffix = require('./append_slug_suffix')
const create_row_id = require('./create_row_id')

module.exports = upsert = async query => {
   const response = []
   const errors = []

   if (typeof query.filter === undefined || is_empty(query.filter)) {
      insert_new_doc(query)
      // return {response, errors} ?
   } else if (has(query.filter, '_id')) {
      update_doc_by_id(query, response, errors, insert_new_doc)
      // return {response, errors} ?
   } else {
      update_doc_by_params(query, response, errors, insert_new_doc)
      // return {response, errors} ?
   }
   console.log({ response, errors })
}

async function insert_new_doc(query, response, errors) {
   console.log('made it to insert')
   console.log(query.options)
   if (
      query.options.should_create_slug &&
      (!has(query.payload, 'slug') || query.payload.slug === '')
   ) {
      console.log('we should create a slug')
      const slug = slug_format(query.payload.title || 'untitled-project')
      query.payload.slug = await append_slug_suffix(query.collection, slug)
   }

   if (query.options.should_create_row_id) {
      console.log('we should create a row_id')
      query.payload.row_id = await create_row_id(query.collection)
   }

   await console.log(query.payload)

   await new query.collection(query.payload)
      .save()
      .then(doc => {
         console.log({ doc })
         response.push(doc)
      })
      .catch(err => {
         console.log({ err })
         errors.push({ save: err })
      })
}

async function update_doc_by_id(query, response, errors) {
   await query.collection.findByIdAndUpdate(
      query.filter._id,
      query.payload,
      {
         new: true,
         runValidators: true,
      },
      (err, doc) => {
         if (err) {
            // we didn't find the doc
            insert_new_doc(query, response, errors)
         } else response.push(doc)
      }
   )
}

async function update_doc_by_params(query, response, errors) {
   await query.collection
      .findOneAndUpdate(query.filter, query.payload, {
         new: true,
         runValidators: true,
      })
      .then(doc => {
         if (!doc) {
            console.log('didnt find the doc')
            insert_new_doc(query, response, errors)
         } else response.push(doc)
      })
      .catch(err => {
         console.log({ findOneAndUpdate: err })
         errors.push({ findOneAndUpdate: err })
      })
}
