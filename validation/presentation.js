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

   console.log({ errors, is_valid: is_empty(errors) })

   return {
      errors, // the errors obj
      is_valid: is_empty(errors), // returns true if the errors obj is empty
   }
}
