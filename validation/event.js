const validator = require('validator')
const is_empty = require('../utils/is_empty')

module.exports = function validate_input_for_event(input) {
   let errors = {}

   // if the user input is empty, replace with an empty string
   // else use the user's input
   input.title = is_empty(input.title) ? '' : input.title
   input.date = is_empty(input.date) ? '' : input.date
   input.is_active = is_empty(input.is_active) ? '' : input.is_active

   // These have an order! E.g. the isEmpty validation will overwrite the isEmail validation.
   if (!validator.isLength(input.title, { max: 80 })) {
      errors.title =
         "I can't believe this event has a title that long. It should be no more than 80 characters."
   }
   if (validator.isEmpty(input.title)) {
      errors.title = 'A title for the event is required.'
   }
   if (input.date && !validator.isISO8601(input.date, { strict: true })) {
      errors.date = 'date is not a valid Date.'
   }
   if (validator.matches(input.title, /-\d+\s*$/)) {
      errors.title =
         'Hey, I know this is weird. But your event title cannot end with a dash followed by a number.'
   }

   console.log({ errors, is_valid: is_empty(errors) })

   return {
      errors, // the errors obj
      is_valid: is_empty(errors), // returns true if the errors obj is empty
   }
}
