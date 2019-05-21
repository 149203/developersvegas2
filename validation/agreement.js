const validator = require('validator')
const is_empty = require('../utils/is_empty')

module.exports = function validate_input_for_agreement(input) {
   let errors = {}

   // if the user input is empty, replace with an empty string
   // else use the user's input
   input.title = is_empty(input.title) ? '' : input.title
   input.text = is_empty(input.text) ? '' : input.text
   input.version = is_empty(input.version) ? '' : input.version
   input.created_on = is_empty(input.created_on) ? '' : input.created_on

   // These have an order! E.g. the isEmpty validation will overwrite the isEmail validation.
   if (validator.isEmpty(input.title)) {
      errors.title = 'A title for the agreement is required.'
   }
   if (validator.isEmpty(input.text)) {
      errors.text = 'Text for the agreement is required.'
   }
   if (validator.isEmpty(input.version)) {
      errors.version = 'A version for the agreement is required.'
   }
   if (
      input.created_on &&
      !validator.isISO8601(input.created_on, { strict: true })
   ) {
      errors.created_on = 'created_on is not a valid Date.'
   }

   console.log({ errors, is_valid: is_empty(errors) })

   return {
      errors, // the errors obj
      is_valid: is_empty(errors), // returns true if the errors obj is empty
   }
}
