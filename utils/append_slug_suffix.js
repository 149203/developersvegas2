const _is_finite = require('lodash/isFinite')
const _to_number = require('lodash/toNumber')

const append_slug_suffix = (collection, slug) =>
   collection
      .findOne({ slug })
      .then(item => {
         if (!item) {
            // slug wasn't found, it's unique
            return slug
         } else {
            let slug_prefix = slug.slice(0, slug.lastIndexOf('-') + 1)
            let slug_suffix = _to_number(slug.slice(slug.lastIndexOf('-') + 1))
            if (_is_finite(slug_suffix)) {
               slug_suffix += 1
               return append_slug_suffix(collection, slug_prefix + slug_suffix)
            } else {
               return append_slug_suffix(collection, `${slug}-2`)
            }
         }
      })
      .catch(err => console.log(err))

module.exports = append_slug_suffix
