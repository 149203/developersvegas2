const validator = require('validator')
const is_empty = require('../utils/is_empty')

module.exports = function validate_input_for_presentation(input) {
   let errors = {}

   // if the user input is empty, replace with an empty string
   // else use the user's input
   input.title = is_empty(input.title) ? '' : input.title
   input.video_url = is_empty(input.video_url) ? '' : input.video_url
   input.video_screenshot_url = is_empty(input.video_screenshot_url)
      ? ''
      : input.video_screenshot_url
   input.signed_up_on = is_empty(input.signed_up_on) ? '' : input.signed_up_on
   input.order = is_empty(input.order) ? '' : input.order
   input.is_active = is_empty(input.is_active) ? '' : input.is_active
   input.has_accepted_agreement = is_empty(input.has_accepted_agreement)
      ? ''
      : input.has_accepted_agreement

   // These have an order! E.g. the isEmpty validation will overwrite the isEmail validation.
   if (!validator.isLength(input.title, { max: 80 })) {
      errors.title =
         'The title of your presentation can be no longer than 80 characters. Brevity is the soul of wit!'
   }
   if (validator.matches(input.title, /-\d+\s*$/)) {
      errors.title =
         'Hey, I know this is weird. But your title cannot end with a dash followed by a number.'
   }
   if (input.video_url && !validator.isURL(input.video_url)) {
      errors.video_url = 'video_url is not a valid URL.'
   }
   if (
      input.video_screenshot_url &&
      !validator.isURL(input.video_screenshot_url)
   ) {
      errors.video_screenshot_url = 'video_screenshot_url is not a valid URL.'
   }
   if (
      input.signed_up_on &&
      !validator.isISO8601(input.signed_up_on, { strict: true })
   ) {
      errors.signed_up_on = 'signed_up_on is not a valid date.'
   }
   if (!validator.isBoolean(input.is_active)) {
      errors.is_active = 'is_active must be a Boolean.'
   }
   if (!validator.isBoolean(input.has_accepted_agreement)) {
      errors.has_accepted_agreement =
         'has_accepted_agreement must be a Boolean.'
   }
   if (!validator.isNumeric(input.order)) {
      errors.order = 'order must be a number.'
   }
   if (validator.isEmpty(input.order)) {
      errors.order = 'The order of this presentation is required.'
   }

   console.log({ errors, is_valid: is_empty(errors) })

   return {
      errors, // the errors obj
      is_valid: is_empty(errors), // returns true if the errors obj is empty
   }
}
