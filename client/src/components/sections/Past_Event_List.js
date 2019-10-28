import React, { Component } from 'react'
import axios from 'axios'
import { format as format_date } from 'date-fns'
import friendly_format_date from '../../utils/friendly_format_date'

function embed_html_video() {
   return {
      __html:
         '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/353151536?color=ffffff&title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
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
                                 dangerouslySetInnerHTML={embed_html_video()}
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
                                 {data.event.location_state}. We saw
                                 presentations from{' '}
                                 {data.past_presentations.map(
                                    (presentation, presentations) => {
                                       return (
                                          presentation.member_first_name +
                                          ' ' +
                                          presentation.member_last_name +
                                          ', '
                                       )
                                    }
                                 )}
                                 {/* Jose Figueroa, Peter
                                 Couture, Veronica Saldivar, Robert Andersen,
                                 Karl Kettelhut, Victor Evangelista, Tony
                                 Suriyathep, Chad Columbus, Mike Zetlow, Dorian
                                 Dominguez, Ben Denzer, and Sunny Clark. */}
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
            </div> */}

            <hr />

            <div className="clearfix"></div>
         </div>
      )
   }
}

export default Past_Event_List
