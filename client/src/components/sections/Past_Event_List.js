import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux' // allows connecting redux to this react component
import { store_past_events } from '../../state/past_events'
import { format as format_date } from 'date-fns'

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

      axios
         .get(`/api/v1/events?occurs=before&date=${todays_datetime}`) // recall we put a PROXY value in our client package.json
         .then(res => {
            console.log(res.data)
            this.props.store_past_events(res.data)
         })
         .catch(err => console.log({ errors: err.response.data }))
   }

   render() {
      return (
         <div>
            <h3 className="mb-1">Past events</h3>
            <hr className="mt-0" />
            <div className="row">
               <div className="col-md-4">
                  <div dangerouslySetInnerHTML={embed_html_video()} />
               </div>
               <div className="col-md-8 ml-md-n4 pr-md-0">
                  <h4>Demo Day - June 8th, 2019</h4>
                  <p className="text-justify">
                     This event saw presentations from Jose Figueroa, Peter
                     Couture, Veronica Saldivar, Robert Andersen, Karl
                     Kettelhut, Victor Evangelista, Tony Suriyathep, Chad
                     Columbus, Mike Zetlow, Dorian Dominguez, Ben Denzer, and
                     Sunny Clark.
                  </p>
                  <p>
                     <a href="https://google.com" className="float-right">
                        See all videos from this event
                     </a>
                  </p>
               </div>
            </div>

            <hr />

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
const map_store_to_props = store => {
   // so I can use stored values as props
   // https://stackoverflow.com/a/38678454
   return {
      stored_past_events: store.past_events,
   }
}
export default connect(
   map_store_to_props, // mapStateToProps
   { store_past_events } // mapDispatchToProps, here an 'action creator' wrapped in an object
)(withRouter(Past_Event_List))
