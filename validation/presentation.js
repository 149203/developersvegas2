const validator = require('validator')
const is_empty = require('../utils/is_empty')

module.exports = function validate_input_for_presentation(input) {
   let errors = {}

   // if the user input is empty, replace with an empty string
   // else use the user's input
   input.title = is_empty(input.title) ? '' : input.title
   input.has_accepted_agreement = is_empty(input.has_accepted_agreement)
      ? ''
      : input.has_accepted_agreement
   input.order = is_empty(input.order) ? '' : input.order
   input.video_url = is_empty(input.video_url) ? '' : input.video_url
   input.video_screenshot_url = is_empty(input.video_screenshot_url)
      ? ''
      : input.video_screenshot_url
   input.is_active = is_empty(input.is_active) ? '' : input.is_active

   // These have an order! E.g. the isEmpty validation will overwrite the isEmail validation.
   if (!validator.isLength(input.title, { max: 80 })) {
      errors.title =
         'The title of your presentation can be no longer than 80 characters. Brevity is the soul of wit!'
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

   console.log({ errors, is_valid: is_empty(errors) })

   return {
      errors, // the errors obj
      is_valid: is_empty(errors), // returns true if the errors obj is empty
   }
}
