const validator = require('validator')
const is_empty = require('../utils/is_empty')
const convert_empty_to_str = require('../utils/convert_empty_to_str')
const convert_to_str = require('../utils/convert_to_str')

module.exports = function validate_input_for_presentation(input) {
   let errors = {}
   let {
      title,
      has_accepted_agreement,
      order,
      is_featured,
      video_screenshot_url,
      video_screenshot_with_play_url,
      video_url,
      is_active,
   } = input

   title = convert_to_str(title)
   if (!validator.isLength(title, { max: 80 })) {
      errors.title =
         'The title of your presentation can be no longer than 80 characters. Brevity is the soul of wit!'
   } else if (validator.matches(title, /-\d+\s*$/)) {
      errors.title =
         'Hey, I know this is weird. But your title cannot end with a dash followed by a number.'
   }

   has_accepted_agreement = convert_empty_to_str(has_accepted_agreement)
   if (has_accepted_agreement !== true) {
      errors.has_accepted_agreement =
         'Please give us permission to film your presentation today. We automate the video and upload process and need your consent before proceeding.'
   }

   order = convert_empty_to_str(order)
   if (order !== '' && typeof order !== 'number') {
      errors.order = 'order must be a number.'
   }

   is_featured = convert_empty_to_str(is_featured)
   if (is_featured !== '' && typeof is_featured !== 'boolean') {
      errors.is_featured = 'is_featured must be a Boolean.'
   }

   video_screenshot_url = convert_to_str(video_screenshot_url)
   if (!validator.isURL(video_screenshot_url)) {
      errors.video_screenshot_url = 'video_screenshot_url is not a valid URL.'
   }

   video_screenshot_with_play_url = convert_to_str(
      video_screenshot_with_play_url
   )
   if (!validator.isURL(video_screenshot_with_play_url)) {
      errors.video_screenshot_url =
         'video_screenshot_with_play_url is not a valid URL.'
   }

   video_url = convert_to_str(video_url)
   if (!validator.isURL(video_url)) {
      errors.video_url = 'video_url is not a valid URL.'
   }

   is_active = convert_empty_to_str(is_active)
   if (is_active !== '' && typeof is_active !== 'boolean') {
      errors.is_active = 'is_active must be a Boolean.'
   }

   return {
      errors, // the errors obj
      is_valid: is_empty(errors), // returns true if the errors obj is empty
   }
}
