import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux' // allows connecting redux to this react component
import { store_next_event } from '../../state/next_event'
import { format as format_date } from 'date-fns'
import friendly_format_time from '../../utils/friendly_format_time'
import friendly_format_date from '../../utils/friendly_format_date'
import trim_time from '../../utils/trim_time'
import main_image from '../../img/las-vegas-developers-coding-meetup-main-image.jpg'

class Next_Event extends Component {
   constructor() {
      super()
      const todays_datetime = format_date(new Date(), 'yyyyMMddkkmm')

      axios
         .get(`/api/v1/events?occurs=after&date=${todays_datetime}`) // recall we put a PROXY value in our client package.json
         .then(res => {
            this.props.store_next_event(res.data)
         })
         .catch(err => console.log({ errors: err.response.data }))
   }

   render() {
      const {
         title,
         started_on,
         ended_on,
         location_name,
         location_street_1,
         location_street_2,
         location_city,
         location_state,
         location_zip,
         location_url,
         cost,
         description,
      } = this.props.stored_next_event

      return (
         <div>
            {/* <h3 className="mb-1 d-md-none d-sm-none d-xs-none d-lg-block d-xl-block">
               Next event
            </h3> */}
            <h3 className="mb-1">Next event</h3>
            <hr className="mt-0" />
            {/* <h4 className="d-md-block d-sm-block d-xs-block d-lg-none d-xl-none">
               {title} - {friendly_format_date(started_on)}
            </h4> */}
            <div className="row">
               <div className="col-12 d-md-none">
                  <h4>
                     {title}
                     {' - '}
                     {friendly_format_date(started_on)}
                  </h4>
               </div>

               <div className="col-6 col-md-4 col-lg-6">
                  <img
                     src={main_image}
                     className="img-fluid"
                     alt="Las Vegas Developers at our monthly coding meetup"
                     title="Las Vegas Developers at our monthly coding meetup"
                  />
               </div>
               <div className="col-6 col-md-8 col-lg-6">
                  <h4 className="d-none d-md-block d-lg-block d-xl-block">
                     {title} - {friendly_format_date(started_on)}
                  </h4>

                  <div className="row d-md-none d-lg-flex next_event_details">
                     <div className="d-none d-md-block col-md-2">
                        <p>Time:</p>
                     </div>
                     <div className="col-12 col-md-10">
                        <p>
                           <span className="text-capitalize">
                              {friendly_format_time(trim_time(started_on))}
                           </span>
                           &nbsp;to&nbsp;
                           {friendly_format_time(trim_time(ended_on))}
                        </p>
                     </div>
                     <div className="d-none d-md-block col-md-2">
                        <p>Place:</p>
                     </div>
                     <div className="col-12 col-md-10">
                        <p>
                           <a
                              href={location_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={location_url}
                           >
                              {location_name}
                           </a>
                           <br />
                           {location_street_1}
                           {location_street_2 && (
                              <span>
                                 <br />
                                 {location_street_2}
                              </span>
                           )}
                           <br />
                           {location_city}, {location_state} {location_zip}
                        </p>
                     </div>
                     <div className="d-none d-md-block col-md-2">
                        <p>Cost:</p>
                     </div>
                     <div className="col-12 col-md-10">
                        <p>{cost}</p>
                     </div>
                     <div className="col-3 col-md-2 d-none d-md-block">
                        <p>Details:</p>
                     </div>
                     <div className="col-9 col-md-10 d-none d-md-block">
                        <p className="">{description}</p>
                     </div>
                  </div>

                  {/* end row */}

                  <div className="row d-none d-md-block d-lg-none">
                     <div className="col">
                        <p className="">{description}</p>
                        <p>
                           We'll meet at&nbsp;
                           <a
                              href={location_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={location_url}
                           >
                              {location_name}
                           </a>{' '}
                           at {location_street_1},&nbsp;
                           {location_street_2 && (
                              <span>{location_street_2},&nbsp;</span>
                           )}
                           {location_city}, {location_state} {location_zip}
                           .&nbsp;
                           <span className="text-capitalize">
                              {friendly_format_time(trim_time(started_on))}
                           </span>
                           &nbsp;to&nbsp;
                           {friendly_format_time(trim_time(ended_on))}.&nbsp;
                           {cost}
                        </p>
                     </div>
                  </div>

                  {/* end row */}
               </div>

               <div className="col-12 d-none d-sm-block d-md-none">
                  <p className="mb-0 mt-2">{description}</p>
               </div>
            </div>
            <br className="d-xl-none d-lg-block d-md-none" />
            <div className="clearfix"></div>
         </div>
      )
   }
}

const map_store_to_props = store => {
   // so I can use stored values as props
   // https://stackoverflow.com/a/38678454
   return {
      stored_next_event: store.next_event,
   }
}
export default connect(
   map_store_to_props, // mapStateToProps
   { store_next_event } // mapDispatchToProps, here an 'action creator' wrapped in an object
)(withRouter(Next_Event))
