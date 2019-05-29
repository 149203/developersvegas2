const create_row_id = collection =>
   collection
      .findOne({})
      .sort({ row_id: 'desc' }) // find the row_id with the highest num
      .then(document => {
         if (document) {
            return document.row_id + 1
         } else return 1 // this is the first document in this collection, row_id: 1
      })
      .catch(err => console.log(err))

module.exports = create_row_id
