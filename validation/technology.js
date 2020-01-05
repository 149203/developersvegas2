const validator = require('validator')
const is_empty = require('../utils/is_empty')

module.exports = function validate_input_for_technology(input) {
   let errors = {}

   // if the user input is empty, replace with an empty string
   // else use the user's input
   input.name = is_empty(input.name) ? '' : input.name
   input.is_active = is_empty(input.is_active) ? '' : input.is_active
   input.popularity = is_empty(input.popularity) ? '' : input.popularity

   // These have an order! E.g. the isEmpty validation will overwrite the isEmail validation.
   if (validator.isEmpty(input.name)) {
      errors.name = 'A name for the technology is required.'
   }
   if (input.is_active !== undefined && !validator.isBoolean(input.is_active)) {
      errors.is_active = 'is_active must be a Boolean.'
   }
   if (input.popularity && !validator.isNumeric(input.popularity)) {
      errors.popularity = 'popularity must be a number.'
   }

   console.log({ errors, is_valid: is_empty(errors) })

   return {
      errors, // the errors obj
      is_valid: is_empty(errors), // returns true if the errors obj is empty
   }
}
