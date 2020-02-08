const validator = require('validator')
const is_empty = require('../utils/is_empty')
const convert_empty_to_str = require('../utils/convert_empty_to_str')
const convert_to_str = require('../utils/convert_to_str')

module.exports = function validate_input_for_event(input) {
   let errors = {}
   let {
      title,
      started_on,
      ended_on,
      location_name,
      location_street_1,
      location_city,
      location_state,
      location_zip,
      location_url,
      cost,
      description,
      is_active,
   } = input

   title = convert_to_str(title)
   if (validator.isEmpty(input.title)) {
      errors.title = 'A title for the event is required.'
   } else if (!validator.isLength(input.title, { max: 80 })) {
      errors.title =
         "I can't believe this event has a title that long. It should be no more than 80 characters."
   } else if (validator.matches(input.title, /-\d+\s*$/)) {
      errors.title =
         'Hey, I know this is weird. But your event title cannot end with a dash followed by a number.'
   }

   // started_on = convert_empty_to_str(started_on)
   // if (validator.isEmpty(input.started_on)) {
   //    errors.started_on = 'A started_on for the event is required.'
   // } else if (typeof started_on !== 'number') {
   //    errors.started_on = 'started_on must be a number'
   // }

   // ended_on = convert_empty_to_str(ended_on)
   // if (validator.isEmpty(input.ended_on)) {
   //    errors.ended_on = 'An ended_on for the event is required.'
   // } else if (typeof ended_on !== 'number') {
   //    errors.ended_on = 'ended_on must be a number'
   // }

   location_name = convert_to_str(location_name)
   if (validator.isEmpty(location_name)) {
      errors.location_name = 'location_name is required.'
   }

   location_street_1 = convert_to_str(location_street_1)
   if (validator.isEmpty(location_street_1)) {
      errors.location_street_1 = 'location_street_1 is required.'
   }

   location_city = convert_to_str(location_city)
   if (validator.isEmpty(location_city)) {
      errors.location_city = 'location_city is required.'
   }

   location_state = convert_to_str(location_state)
   if (validator.isEmpty(location_state)) {
      errors.location_state = 'location_state is required.'
   }

   location_zip = convert_to_str(location_zip)
   if (validator.isEmpty(location_zip)) {
      errors.location_zip = 'location_zip is required.'
   }

   location_url = convert_to_str(location_url)
   if (validator.isEmpty(location_url)) {
      errors.location_url = 'location_url is required.'
   }

   cost = convert_to_str(cost)
   if (validator.isEmpty(cost)) {
      errors.cost = 'cost is required.'
   }

   description = convert_to_str(description)
   if (validator.isEmpty(description)) {
      errors.description = 'description is required.'
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
