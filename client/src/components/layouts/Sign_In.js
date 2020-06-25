import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux' // allows connecting redux to this react component
import { store_next_event } from '../../state/next_event'
import { store_sign_in_stage } from '../../state/sign_in_stage'
import { format as format_date } from 'date-fns'
import Sign_In_Search from '../sections/Sign_In_Search'
import Sign_In_New_Member from '../sections/Sign_In_New_Member'
import Sign_In_Want_To_Present from '../sections/Sign_In_Want_To_Present'
import Sign_In_Presentation from '../sections/Sign_In_Presentation'
import Sign_In_Finish from '../sections/Sign_In_Finish'

class Sign_In extends Component {
   constructor(props) {
      super(props)

      this.props.store_sign_in_stage('Sign_In_Search')

      const todays_datetime = format_date(new Date(), 'yyyyMMddHHmm')
      axios
         .get(`/api/v1/events?occurs=after&date=${todays_datetime}`) // recall we put a PROXY value in our client package.json
         .then((res) => {
            this.props.store_next_event(res.data)
         })
         .catch((err) => console.log({ errors: err.response.data }))
   }

   update_stage() {
      const stage = this.props.stored_sign_in_stage
      if (stage === 'Sign_In_Search') {
         return <Sign_In_Search />
      }
      if (stage === 'Sign_In_New_Member') {
         return <Sign_In_New_Member />
      }
      if (stage === 'Sign_In_Want_To_Present') {
         return <Sign_In_Want_To_Present />
      }
      if (stage === 'Sign_In_Presentation') {
         return <Sign_In_Presentation />
      }
      if (stage === 'Sign_In_Finish') {
         return <Sign_In_Finish />
      }
   }

   render() {
      return (
         <div style={{ overflowY: 'scroll', height: '100vh' }}>
            <div className="container">{this.update_stage()}</div>
         </div>
      )
   }
}

const map_store_to_props = (store) => {
   // so I can use stored values as props
   // https://stackoverflow.com/a/38678454
   return {
      stored_sign_in_stage: store.sign_in_stage,
   }
}
export default connect(
   map_store_to_props, // mapStateToProps
   { store_next_event, store_sign_in_stage } // mapDispatchToProps, here an 'action creator' wrapped in an object
)(withRouter(Sign_In))
