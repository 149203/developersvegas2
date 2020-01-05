const validator = require('validator')
const is_empty = require('../utils/is_empty')

module.exports = function validate_input_for_event(input) {
   let errors = {}

   // if the user input is empty, replace with an empty string
   // else use the user's input
   input.title = is_empty(input.title) ? '' : input.title
   input.started_on = is_empty(input.started_on) ? '' : input.started_on
   input.ended_on = is_empty(input.ended_on) ? '' : input.ended_on
   input.is_active = is_empty(input.is_active) ? '' : input.is_active

   // These have an order! E.g. the isEmpty validation will overwrite the isEmail validation.
   if (!validator.isLength(input.title, { max: 80 })) {
      errors.title =
         "I can't believe this event has a title that long. It should be no more than 80 characters."
   }
   if (validator.matches(input.title, /-\d+\s*$/)) {
      errors.title =
         'Hey, I know this is weird. But your event title cannot end with a dash followed by a number.'
   }
   if (validator.isEmpty(input.title)) {
      errors.title = 'A title for the event is required.'
   }
   if (input.is_active !== undefined && !validator.isBoolean(input.is_active)) {
      errors.is_active = 'is_active must be a Boolean.'
   }
   if (validator.isEmpty(input.started_on)) {
      errors.started_on = 'A started_on for the event is required.'
   }
   if (validator.isEmpty(input.ended_on)) {
      errors.ended_on = 'A ended_on for the event is required.'
   }

   console.log({ errors, is_valid: is_empty(errors) })

   return {
      errors, // the errors obj
      is_valid: is_empty(errors), // returns true if the errors obj is empty
   }
}
