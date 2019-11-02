// update all video information for all presentations with videos in the database

// get an array of all video objects from Vimeo
const example_vimeo_videos = {
   video_id: String,
   video_url: String,
   video_iframe: String,
   video_screenshot_url: String,
   video_screenshot_with_play_url: String,
   member_first_name: String,
   member_last_name: String,
   event_title: String,
   event_started_on: Number,
}

// Find all event_ids by {event_started_on, event_title}
// Find all member_ids by {first_name, last_name}
// Create an array of objects for every permutation, adding event_id and member_id properties
// updateMany in presentation_model by {event_id, member_id}
// Set the 5 video properties
// console.log if it doesn't exist

require('dotenv').config({ path: '../.env' })
const Vimeo = require('vimeo').Vimeo
const fs = require('fs')
const path = require('path')
const pick = require('lodash/pick')
const get_chars_between = require('../utils/get_chars_between')
const convert_friendly_date_to_num_str = require('../utils/convert_friendly_date_to_num_str')
const date_format = require('date-fns/format')

const vimeo_account = new Vimeo(
   process.env.vimeo_client_id,
   process.env.vimeo_client_secret,
   process.env.vimeo_access_token
)
// get an array of all video objects from Vimeo

vimeo_account.request(
   {
      method: 'GET',
      path: '/users/96172694/videos',
   },
   (error, body) => {
      if (error) {
         console.log(error)
      } else {
         const cleaned_video_data = body.data.map(video => {
            return {
               video_id: get_vimeo_id(video.uri),
               video_url: video.link,
               video_iframe: video.embed.html,
               video_screenshot_url: video.pictures.sizes[2].link,
               video_screenshot_with_play_url:
                  video.pictures.sizes[2].link_with_play_button,
               member_first_name: get_first_name(video.description),
               member_last_name: get_last_name(video.description),
               event_title: 'Demo Day',
               event_started_on: get_event_started_on(video.description),
            }
         })
         fs.writeFileSync(
            'logs/vimeo_results.json',
            JSON.stringify(cleaned_video_data)
         )
      }
   }
)

function get_vimeo_id(vimeo_uri) {
   return vimeo_uri.slice(vimeo_uri.lastIndexOf('/') + 1)
}

function get_first_name(description) {
   return get_chars_between(
      description,
      /(?<=.*presentation\sby)\s/,
      /(?<=presentation\sby\s.*)\s.*/
   )
}

function get_last_name(description) {
   return get_chars_between(
      description,
      /(?<=presentation\sby\s.*)\s/,
      /(\sat Demo Day.*)/
   )
}

function get_event_started_on(description) {
   const friendly_date = get_chars_between(
      description,
      /(?<=\sat Demo Day,)\s/,
      /\.\sSee\sLas\sVegas/
   )
   return Number(convert_friendly_date_to_num_str(friendly_date) + '1200')
}
