const validator = require('validator')
const is_empty = require('../utils/is_empty')
const convert_empty_to_str = require('../utils/convert_empty_to_str')
const convert_to_str = require('../utils/convert_to_str')

module.exports = function validate_input_for_technology(input) {
   let errors = {}
   let { name, popularity, is_active } = input

   name = convert_to_str(name)
   if (validator.isEmpty(input.name)) {
      errors.name = 'A name for the technology is required.'
   }

   popularity = convert_empty_to_str(popularity)
   if (popularity !== '' && typeof popularity !== 'number') {
      errors.popularity = 'popularity must be a number.'
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
