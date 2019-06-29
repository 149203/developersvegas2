const has = require('lodash/has')
const is_empty = require('lodash/isEmpty')
const slug_format = require('./slug_format')
const append_slug_suffix = require('./append_slug_suffix')
const create_row_id = require('./create_row_id')

module.exports = upsert = query => {
   if (typeof query.filter === undefined || is_empty(query.filter)) {
      return insert_new_doc(query)
   } else if (has(query.filter, '_id')) {
      return update_doc_by_id(query, insert_new_doc)
   } else {
      return update_doc_by_params(query, insert_new_doc)
   }
}

async function insert_new_doc(query) {
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

   return new query.collection(query.payload)
      .save()
      .then(doc => doc)
      .catch(err => {
         return { error_on_save: err }
      })
}

function update_doc_by_id(query) {
   return query.collection
      .findByIdAndUpdate(query.filter._id, query.payload, {
         new: true,
         runValidators: true,
      })
      .then(doc => {
         if (!doc) {
            return insert_new_doc(query)
         } else {
            return doc
         }
      })
      .catch(err => {
         return { error: true, error_on_findByIdAndUpdate: err }
      })
}

function update_doc_by_params(query) {
   return query.collection
      .findOneAndUpdate(query.filter, query.payload, {
         new: true,
         runValidators: true,
      })
      .then(doc => {
         if (!doc) {
            return insert_new_doc(query)
         } else {
            return doc
         }
      })
      .catch(err => {
         return { error: true, error_on_findOneAndUpdate: err }
      })
}
