const validator = require('validator')
const is_empty = require('../utils/is_empty')
const convert_empty_to_str = require('../utils/convert_empty_to_str')
const convert_to_str = require('../utils/convert_to_str')

module.exports = function validate_input_for_member(input) {
   let errors = {}
   let { first_name, last_name, email, portfolio_url, bio, is_active } = input

   first_name = convert_to_str(first_name)
   if (validator.isEmpty(first_name)) {
      errors.first_name = 'Your first name is required, friend.'
   } else if (!validator.isLength(first_name, { max: 50 })) {
      errors.first_name =
         "Your first name can be no longer than 50 characters. I'm sorry yours is so long. Your parents must have had a weird sense of humor."
   }

   last_name = convert_to_str(last_name)
   if (validator.isEmpty(last_name)) {
      errors.last_name = 'Your last name is required, friend.'
   } else if (!validator.isLength(last_name, { max: 50 })) {
      errors.last_name =
         "Your last name can be no longer than 50 characters. I'm sorry yours is so long. You must be German."
   } else if (validator.matches(last_name, /-\d+\s*$/)) {
      errors.last_name =
         'Hey, I know this is weird. But your last name cannot end with a dash followed by a number.'
   }

   email = convert_to_str(email)
   if (validator.isEmpty(email)) {
      errors.email =
         'An email address is required, friend. We want to keep you in the loop if there are any important changes.'
   } else if (!validator.isEmail(email)) {
      errors.email = 'Double-check that. Please enter a valid email.'
   }

   portfolio_url = convert_to_str(portfolio_url)
   if (!validator.isLength(portfolio_url, { max: 2000 })) {
      errors.portfolio_url =
         'Your portfolio URL should be less than 2000 characters. Do you even SEO?'
   }

   bio = convert_to_str(bio)
   if (!validator.isLength(bio, { max: 500 })) {
      errors.bio =
         "Your bio should be less than 500 characters. We're not writing a novel here, Steinbeck."
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
