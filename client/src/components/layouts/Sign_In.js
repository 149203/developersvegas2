import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux' // allows connecting redux to this react component
import { store_next_event } from '../../state/next_event'
import { store_sign_in_stage } from '../../state/sign_in_stage'
import { format as format_date } from 'date-fns'
import { app } from '../../state/app'

class Sign_In extends Component {
   constructor(props) {
      super(props)

      this.props.store_sign_in_stage('Sign_In_Search')

      const todays_datetime = format_date(new Date(), 'yyyyMMddkkmm')

      axios
         .get(`/api/v1/events?occurs=after&date=${todays_datetime}`) // recall we put a PROXY value in our client package.json
         .then(res => {
            this.props.store_next_event(res.data)
         })
         .catch(err => console.log({ errors: err.response.data }))
   }

   render() {
      return (
         <div className="container">
            <div className="row">
               <div className="col-12 mt-3">
                  <h1 className="font-weight-light mb-3 mb-lg-4">
                     Sign in to Demo Day
                  </h1>
               </div>
            </div>
         </div>
      )
   }
}

const map_store_to_props = store => {
   // so I can use stored values as props
   // https://stackoverflow.com/a/38678454
   return {
      stored_next_event: store.next_event,
      stored_sign_in_stage: store.sign_in_stage,
   }
}
export default connect(
   map_store_to_props, // mapStateToProps
   { store_next_event, store_sign_in_stage } // mapDispatchToProps, here an 'action creator' wrapped in an object
)(withRouter(Sign_In))
