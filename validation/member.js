const validator = require('validator')
const is_empty = require('../utils/is_empty') // TODO: replace with lodash isEmpty

module.exports = function validate_input_for_member(input) {
   let errors = {}

   // if the user input is empty, replace with an empty string
   // else use the user's input
   input.first_name = is_empty(input.first_name) ? '' : input.first_name
   input.last_name = is_empty(input.last_name) ? '' : input.last_name
   input.email = is_empty(input.email) ? '' : input.email
   input.portfolio_url = is_empty(input.portfolio_url)
      ? ''
      : input.portfolio_url
   input.bio = is_empty(input.bio) ? '' : input.bio
   input.joined_on = is_empty(input.joined_on) ? '' : input.joined_on
   input.is_active = is_empty(input.is_active) ? '' : input.is_active

   // These have an order! E.g. the isEmpty validation will overwrite the isEmail validation.
   if (!validator.isLength(input.first_name, { max: 50 })) {
      errors.first_name =
         "Your first name can be no longer than 50 characters. I'm sorry yours is so long. Your parents must have had a weird sense of humor."
   }
   if (validator.isEmpty(input.first_name)) {
      errors.first_name = 'Your first name is required, friend.'
   }
   if (validator.matches(input.last_name, /-\d+\s*$/)) {
      errors.last_name =
         'Hey, I know this is weird. But your last name cannot end with a dash followed by a number.'
   }
   if (!validator.isLength(input.last_name, { max: 50 })) {
      errors.last_name =
         "Your last name can be no longer than 50 characters. I'm sorry yours is so long. You must be German."
   }
   if (validator.isEmpty(input.last_name)) {
      errors.last_name = 'Your last name is required, friend.'
   }
   if (!validator.isEmail(input.email)) {
      errors.email = 'Double-check that. Please enter a valid email.'
   }
   if (validator.isEmpty(input.email)) {
      errors.email = 'An email address is required, stranger.'
   }
   if (!validator.isLength(input.portfolio_url, { max: 2000 })) {
      errors.portfolio_url =
         'Your portfolio URL should be less than 2000 characters. Do you even SEO?'
   }
   if (!validator.isLength(input.bio, { max: 500 })) {
      errors.bio =
         "Your bio should be less than 500 characters. We're not writing a novel here."
   }
   if (
      input.joined_on &&
      !validator.isISO8601(input.joined_on, { strict: true })
   ) {
      errors.joined_on = 'joined_on is not a valid date.'
   }
   if (input.is_active && !validator.isBoolean(input.is_active)) {
      errors.is_active = 'is_active must be a Boolean.'
   }

   console.log({ errors, is_valid: is_empty(errors) })

   return {
      errors, // the errors obj
      is_valid: is_empty(errors), // returns true if the errors obj is empty
   }
}
