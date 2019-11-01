// update all video information for all presentation with videos in the database

// get an array of all video objects from Vimeo
const example_vimeo_videos = {
   video_id: String,
   video_screenshot_url: String,
   video_screenshot_with_play_url: String,
   video_url: String,
   video_iframe: String,
   presentation_title: String,
   member_first_name: String,
   member_last_name: String,
   event_started_on: Number,
   event_title: String,
}

// Find all event_ids by {event_started_on, event_title}
// Find all member_ids by {first_name, last_name}
// Create an array of objects for every permutation, adding event_id and member_id properties
// updateMany in presentation_model by {event_id, member_id}
// Set the 5 video properties
// console.log if it doesn't exist
