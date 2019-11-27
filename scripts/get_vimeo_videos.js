// gets all video information from Vimeo

// Imports
require('dotenv').config({ path: '../.env' })
const Vimeo = require('vimeo').Vimeo
const fs = require('fs')
const get_chars_between = require('../utils/get_chars_between')
const convert_friendly_date_to_num_str = require('../utils/convert_friendly_date_to_num_str')

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
      query: { per_page: 80, page: 1 }, // NOTE: YOU CAN ONLY GET A MAX OF 100 PER PAGE
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
               description: video.description,
            }
         })
         fs.writeFileSync(
            'logs/vimeo_results.json',
            JSON.stringify(cleaned_video_data)
         )
         console.log(`${cleaned_video_data.length} items returned`)
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
