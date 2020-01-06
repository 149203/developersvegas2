const validator = require('validator')
const is_empty = require('../utils/is_empty')
const convert_to_str = require('../utils/convert_to_str')

module.exports = function validate_input_for_event_member(input) {
   let errors = {}
   let { member_id, event_id } = input

   member_id = convert_to_str(member_id)
   if (validator.isEmpty(member_id)) {
      errors.member_id = 'member_id is required.'
   } else if (!validator.isMongoId(member_id)) {
      errors.member_id = 'member_id must be a valid Mongo ID.'
   }

   event_id = convert_to_str(event_id)
   if (validator.isEmpty(event_id)) {
      errors.event_id = 'event_id is required.'
   } else if (!validator.isMongoId(event_id)) {
      errors.event_id = 'event_id must be a valid Mongo ID.'
   }

   console.log({ errors, is_valid: is_empty(errors) })

   return {
      errors, // the errors obj
      is_valid: is_empty(errors), // returns true if the errors obj is empty
   }
}
