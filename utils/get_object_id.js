module.exports = get_object_id = async (collection, find_by_obj) => {
   let object_id
   await collection
      .findOne(find_by_obj)
      .then(doc => {
         console.log('GOT MEMBER ID:', doc)
         object_id = doc._id
      })
      .catch(err => (object_id = err))
   return object_id
}
