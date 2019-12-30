import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux' // allows connecting redux to this react component
import { store_sign_in_stage } from '../../state/sign_in_stage'

class Sign_In_Want_To_Present extends Component {
   i_want_to_present() {
      console.log('I want to present')
   }

   im_just_lurking() {
      console.log("I'm just lurking")
   }

   render() {
      return (
         <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3 mt-3">
               <h1 className="mb-4">Would you like to present code today?</h1>
               <p>
                  Only software developers and learners may present. If you have
                  a job opening, app idea, or other announcement, please inform
                  the meetup facilitator.
               </p>
               <button
                  className="btn btn-primary float-right ml-6 mb-4"
                  onClick={() => this.i_want_to_present()}
               >
                  Yes, I'll present
               </button>
               <button
                  className="btn btn-danger float-right"
                  onClick={() => this.im_just_lurking()}
               >
                  No, I'll just lurk
               </button>
            </div>
         </div>
      )
   }
}

const map_store_to_props = store => {
   // so I can use stored values as props
   // https://stackoverflow.com/a/38678454
   return {
      stored_sign_in_stage: store.sign_in_stage,
   }
}
export default connect(
   map_store_to_props, // mapStateToProps
   { store_sign_in_stage } // mapDispatchToProps, here an 'action creator' wrapped in an object
)(withRouter(Sign_In_Want_To_Present))
