const validator = require('validator')
const is_empty = require('../utils/is_empty')
const convert_empty_to_str = require('../utils/convert_empty_to_str')
const convert_to_str = require('../utils/convert_to_str')

module.exports = function validate_input_for_agreement(input) {
   let errors = {}
   let { title, text, version, is_active } = input

   title = convert_to_str(title)
   if (validator.isEmpty(title)) {
      errors.title = 'A title for the agreement is required.'
   }

   text = convert_to_str(text)
   if (validator.isEmpty(text)) {
      errors.text = 'Text for the agreement is required.'
   }

   version = convert_empty_to_str(version)
   if (validator.isEmpty(version)) {
      errors.version = 'A version for the agreement is required.'
   } else if (typeof version !== 'number') {
      errors.version = 'Version must be a number.'
   }

   is_active = convert_empty_to_str(is_active)
   if (is_active !== '' && typeof is_active !== 'boolean') {
      errors.is_active = 'is_active must be a Boolean.'
   }

   console.log({ errors, is_valid: is_empty(errors) })

   return {
      errors, // the errors obj
      is_valid: is_empty(errors), // returns true if the errors obj is empty
   }
}
