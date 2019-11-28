// IMPORTANT: Backup up databases before running!
// IMPORTANT: Select database below before running!
// Updates presentation data in db from video details fetched from vimeo

// Imports
require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')
const presentation_collection = require('../models/presentation') // DEFINE YOUR COLLECTION FROM /models
const db_presentations = require('../data/get_presentations.json') // json of presentations in the db
const vimeo_videos = require('../data/get_vimeo_videos.json') // json of video data from vimeo
const map = require('lodash/map')
const filter = require('lodash/filter')
const for_each = require('lodash/forEach')

// Databases
const development_db_uri = process.env.development_db_uri
const production_db_uri = process.env.production_db_uri
const db = production_db_uri // SELECT DB

const updated_presentations = map(db_presentations, presentation => {
   const filtered_videos = filter(vimeo_videos, video => {
      return (
         video.event_started_on === presentation.event_id.started_on &&
         video.member_first_name === presentation.member_id.first_name &&
         video.member_last_name === presentation.member_id.last_name
      ) // returns an array of videos where these 3 things match (only 1 video)
   })
   const matched_video = filtered_videos[0] // if it returns undefined, there is mismatched data!
   presentation.video_id = matched_video.video_id
   presentation.video_url = matched_video.video_url
   presentation.video_iframe = matched_video.video_iframe
   presentation.video_screenshot_url = matched_video.video_screenshot_url
   presentation.video_screenshot_with_play_url =
      matched_video.video_screenshot_with_play_url

   return presentation
})

mongoose.connect(db).then(() => {
   for_each(updated_presentations, presentation => {
      presentation_collection
         .findByIdAndUpdate(presentation._id, presentation, {
            new: true,
            runValidators: true,
         })
         .then(docs => {
            console.log(`NO ERROR: `, docs)
            mongoose.disconnect()
         })
         .catch(err => {
            console.log(err)
            mongoose.disconnect()
         })
   }).catch(err => {
      console.log(err)
      mongoose.disconnect()
   })
})
