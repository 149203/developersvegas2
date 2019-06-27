const _has = require('lodash/has')
const mongoose = require('mongoose')
const append_slug_suffix = require('./append_slug_suffix')
const create_row_id = require('./create_row_id')

module.exports = upsert = async (upsert_obj, collection, filter_params_obj) => {
   let response
   let errors

   // if (options_obj.should_create_slug) {
   //    // send a formatted slug in upsert_obj.slug
   //    upsert_obj.slug = await append_slug_suffix(collection, upsert_obj.slug)
   // }

   // if (options_obj.should_create_row_id) {
   //    upsert_obj.row_id = await create_row_id(collection)
   // }

   await collection
      .findOneAndUpdate(
         filter_params_obj,
         { $set: upsert_obj },
         {
            new: true,
            upsert: true,
         }
      )
      .then(doc => (response = doc))
      .catch(err => (errors = { findOneAndUpdate: err }))

   return { response, errors }
}
