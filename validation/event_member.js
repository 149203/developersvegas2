const validator = require('validator')
const is_empty = require('../utils/is_empty')

module.exports = function validate_input_for_event_member(input) {
   let errors = {}

   // if the user input is empty, replace with an empty string
   // else use the user's input
   input.member_id = is_empty(input.member_id) ? '' : input.member_id
   input.event_id = is_empty(input.event_id) ? '' : input.event_id

   // These have an order! E.g. the isEmpty validation will overwrite the isEmail validation.
   if (!validator.isMongoId(input.member_id)) {
      errors.member_id = 'member_id must be a valid Mongo ID.'
   }
   if (validator.isEmpty(input.member_id)) {
      errors.member_id = 'member_id is required.'
   }
   if (!validator.isMongoId(input.event_id)) {
      errors.event_id = 'event_id must be a valid Mongo ID.'
   }
   if (validator.isEmpty(input.event_id)) {
      errors.event_id = 'event_id is required.'
   }

   console.log({ errors, is_valid: is_empty(errors) })

   return {
      errors, // the errors obj
      is_valid: is_empty(errors), // returns true if the errors obj is empty
   }
}
