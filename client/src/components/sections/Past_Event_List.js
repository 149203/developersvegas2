import React, { Component } from 'react'
import axios from 'axios'
import { format as format_date } from 'date-fns'
import friendly_format_date from '../../utils/friendly_format_date'

function embed_html_video(html) {
   return {
      __html: html,
   }
}

class Past_Event_List extends Component {
   constructor() {
      super()
      const todays_datetime = format_date(new Date(), 'yyyyMMddkkmm')
      this.state = { past_events: [] }

      axios
         .get(`/api/v1/events?occurs=before&date=${todays_datetime}`) // recall we put a PROXY value in our client package.json
         .then(res => {
            console.log(res.data)
            this.setState({ past_events: res.data })
         })
         .catch(err => console.log({ errors: err.response.data }))
   }

   render() {
      function featured_video_html(data) {
         const html = data.past_presentations.filter(presentation => {
            return presentation.is_featured
         })[0].video_iframe
         return html
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
                           <div className="col-md-4">
                              <div
                                 dangerouslySetInnerHTML={embed_html_video(
                                    featured_video_html(data)
                                 )}
                              />
                           </div>
                           <div className="col-md-8 ml-md-n4 pr-md-0">
                              <h4>
                                 {data.event.title}
                                 {' - '}
                                 {friendly_format_date(data.event.started_on)}
                              </h4>
                              <p className="text-justify">
                                 <a
                                    href="https://www.meetup.com/Las-Vegas-Developers/"
                                    target="_blank"
                                 >
                                    Las Vegas Developers
                                 </a>{' '}
                                 met on{' '}
                                 {friendly_format_date(data.event.started_on)}{' '}
                                 at{' '}
                                 <a
                                    href={data.event.location_url}
                                    target="_blank"
                                 >
                                    {data.event.location_name}
                                 </a>{' '}
                                 in {data.event.location_city},{' '}
                                 {data.event.location_state} and saw
                                 presentations from{' '}
                                 {data.past_presentations.map(
                                    (presentation, i, arr) => {
                                       return (
                                          <span>
                                             <a
                                                href={presentation.video_url}
                                                target="_blank"
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
                                    }
                                 )}
                              </p>
                           </div>
                        </div>

                        <hr />
                     </div>
                  ))}
               </div>
            )}

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
