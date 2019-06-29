const has = require('lodash/has')
const is_empty = require('lodash/isEmpty')
const slug_format = require('./slug_format')
const append_slug_suffix = require('./append_slug_suffix')
const create_row_id = require('./create_row_id')

module.exports = upsert = query => {
   const response = []
   const errors = []
   let result

   if (typeof query.filter === undefined || is_empty(query.filter)) {
      result = insert_new_doc(query, response, errors)
      //console.log({ result })
      return result
   } else if (has(query.filter, '_id')) {
      result = update_doc_by_id(query, response, errors, insert_new_doc)
      //console.log({ result })
      return result
   } else {
      result = update_doc_by_params(query, response, errors, insert_new_doc)
      //console.log(result)
      return result
   }
   // console.log({ response, errors })
}

async function insert_new_doc(query, response, errors) {
   if (
      query.options.should_create_slug &&
      (!has(query.payload, 'slug') || query.payload.slug === '')
   ) {
      const slug = slug_format(query.payload.title || 'untitled-project')
      query.payload.slug = await append_slug_suffix(query.collection, slug)
   }

   if (query.options.should_create_row_id) {
      query.payload.row_id = await create_row_id(query.collection)
   }

   let result
   await new query.collection(query.payload)
      .save()
      .then(doc => {
         result = doc
      })
      .catch(err => {
         result = { error_on_save: err }
      })
   //console.log({ result })
   return result
}

function update_doc_by_id(query, response, errors) {
   return query.collection
      .findByIdAndUpdate(query.filter._id, query.payload, {
         new: true,
         runValidators: true,
      })
      .then(doc => {
         if (!doc) {
            return insert_new_doc(query, response, errors)
         } else {
            return doc
         }
      })
      .catch(err => {
         return { error: true, error_on_findByIdAndUpdate: err }
      })
}

function update_doc_by_params(query, response, errors) {
   return query.collection
      .findOneAndUpdate(query.filter, query.payload, {
         new: true,
         runValidators: true,
      })
      .then(doc => {
         if (!doc) {
            return insert_new_doc(query, response, errors)
         } else {
            return doc
         }
      })
      .catch(err => {
         return { error: true, error_on_findOneAndUpdate: err }
      })
}
