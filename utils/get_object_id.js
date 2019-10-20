const has = require('lodash/has')

module.exports = get_object_id = async (collection, find_by_obj) => {
   let object_id
   await collection
      .findOne(find_by_obj)
      .then(doc => {
         if (doc) {
            // if (doc.first_name) {
            //    console.log('GOT MEMBER ID:', doc)
            // }
            object_id = doc._id
         } // else console.log('NO DOC FOR', find_by_obj)
      })
      .catch(err => console.log(err))
   return object_id
}
