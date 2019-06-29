module.exports = create_row_id = collection => {
   return collection
      .findOne({})
      .sort({ row_id: 'desc' }) // find the row_id with the highest num
      .then(doc => {
         if (doc) {
            return doc.row_id + 1
         } else return 1 // this is the first document in this collection, row_id: 1
      })
      .catch(err => console.log(err))
}
