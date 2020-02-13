import React, { Component } from 'react'
import axios from 'axios'
import { format as format_date } from 'date-fns'
import friendly_format_date from '../../utils/friendly_format_date'
import friendly_format_date_short from '../../utils/friendly_format_date_short'
import friendly_format_time from '../../utils/friendly_format_time'
import trim_time from '../../utils/trim_time'

class Past_Event_List extends Component {
   constructor() {
      super()
      const todays_datetime = format_date(new Date(), 'yyyyMMddHHmm')
      this.state = { past_events: [] }

      axios
         .get(`/api/v1/events?occurs=before&date=${todays_datetime}`) // recall we put a PROXY value in our client package.json
         .then(res => {
            console.log(res.data)
            this.setState({ past_events: res.data })
         })
         .catch(err => console.log({ errors: err }))
   }

   render() {
      function featured_video_id(data) {
         const featured_video = data.past_presentations.filter(presentation => {
            return presentation.is_featured
         })[0]
         return featured_video.video_id
      }

      function featured_video_title(data) {
         const featured_video = data.past_presentations.filter(presentation => {
            return presentation.is_featured
         })[0]
         const { member_first_name, member_last_name, title } = featured_video
         return `${member_first_name} ${member_last_name} - ${title}`
      }

      return (
         <div>
            <h3 className="mb-1">Past events</h3>
            <hr className="mt-0" />
            {this.state.past_events && (
               <div>
                  {this.state.past_events.map(data => (
                     <div key={data.event._id}>
                        <div className="row">
                           <div className="col-12 d-md-none">
                              <h4 className="d-none d-sm-block">
                                 {data.event.title}
                                 {' - '}
                                 {friendly_format_date(data.event.started_on)}
                              </h4>
                              <h5 className="d-sm-none mb-3">
                                 {data.event.title}
                                 {' - '}
                                 {friendly_format_date_short(
                                    data.event.started_on
                                 )}
                              </h5>
                           </div>
                           <div className="col-md-4 col-sm-6">
                              <div
                                 style={{
                                    padding: '56.25% 0 0 0',
                                    position: 'relative',
                                 }}
                              >
                                 <iframe
                                    src={`https://player.vimeo.com/video/${featured_video_id(
                                       data
                                    )}?color=ffffff&title=0&byline=0&portrait=0`}
                                    style={{
                                       position: 'absolute',
                                       top: 0,
                                       left: 0,
                                       width: '100%',
                                       height: '100%',
                                    }}
                                    frameBorder="0"
                                    allow="autoplay; fullscreen"
                                    allowFullScreen
                                    title={`A video iframe: ${featured_video_title(
                                       data
                                    )}`}
                                 ></iframe>
                              </div>
                              {/* <script src="https://player.vimeo.com/api/player.js"></script> */}
                           </div>
                           <div className="col-md-8 col-sm-6">
                              <h4 className="d-none d-md-block">
                                 {data.event.title}
                                 {' - '}
                                 {friendly_format_date(data.event.started_on)}
                              </h4>
                              <p className="past_event_details">
                                 <a
                                    href="https://www.meetup.com/Las-Vegas-Developers/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="https://www.meetup.com/Las-Vegas-Developers/"
                                 >
                                    Las Vegas Developers
                                 </a>{' '}
                                 met{' '}
                                 {friendly_format_time(
                                    trim_time(data.event.started_on)
                                 )}{' '}
                                 to{' '}
                                 {friendly_format_time(
                                    trim_time(data.event.ended_on)
                                 )}{' '}
                                 at{' '}
                                 <a
                                    href={data.event.location_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={data.event.location_url}
                                 >
                                    {data.event.location_name}
                                 </a>{' '}
                                 in {data.event.location_city},{' '}
                                 {data.event.location_state}. We saw
                                 presentations from{' '}
                                 {data.past_presentations
                                    .filter(
                                       presentation => presentation.is_active
                                    )
                                    .map((presentation, i, arr) => {
                                       return (
                                          <span key={presentation._id}>
                                             <a
                                                href={presentation.video_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title={presentation.video_url}
                                             >
                                                {presentation.member_first_name +
                                                   ' ' +
                                                   presentation.member_last_name}
                                             </a>
                                             {presentation.is_featured
                                                ? ' (featured)'
                                                : ''}
                                             {i === arr.length - 2
                                                ? ', and '
                                                : ''}
                                             {i < arr.length - 2 ? ', ' : ''}
                                             {i === arr.length - 1 ? '.' : ''}
                                          </span>
                                       )
                                    })}
                              </p>
                           </div>
                        </div>

                        <hr />
                     </div>
                  ))}
               </div>
            )}

            {/* TESTIMONIAL */}
            {/* <div className="row">
               <div className="col-md-12">
                  <blockquote className="blockquote mx-8 my-2">
                     “Las Vegas Developers was INSTRUMENTAL in meeting people and
                     making the connections that ultimately led to my first job as
                     a developer. Go to Demo Day if you want to make something of
                     yourself.” —{' '}
                     <a href="https://google.com">Victor Evangelista</a>
                  </blockquote>
               </div>
               <hr />
            </div> */}

            <div className="clearfix"></div>
         </div>
      )
   }
}

export default Past_Event_List
