const validator = require('validator')
const is_empty = require('../utils/is_empty')

module.exports = function validate_input_for_event(input) {
   let errors = {}

   // if the user input is empty, replace with an empty string
   // else use the user's input
   input.title = is_empty(input.title) ? '' : input.title
   input.started_on = is_empty(input.started_on) ? '' : input.started_on
   input.is_active = is_empty(input.is_active) ? '' : input.is_active

   // These have an order! E.g. the isEmpty validation will overwrite the isEmail validation.
   if (!validator.isLength(input.title, { max: 80 })) {
      errors.title =
         "I can't believe this event has a title that long. It should be no more than 80 characters."
   }
   if (validator.isEmpty(input.title)) {
      errors.title = 'A title for the event is required.'
   }

   if (validator.matches(input.title, /-\d+\s*$/)) {
      errors.title =
         'Hey, I know this is weird. But your event title cannot end with a dash followed by a number.'
   }
   if (
      input.started_on &&
      !validator.isISO8601(input.started_on, { strict: true })
   ) {
      errors.started_on = 'started_on is not a valid date.'
   }
   if (!validator.isBoolean(input.is_active)) {
      errors.is_active = 'is_active must be a Boolean.'
   }

   console.log({ errors, is_valid: is_empty(errors) })

   return {
      errors, // the errors obj
      is_valid: is_empty(errors), // returns true if the errors obj is empty
   }
}
