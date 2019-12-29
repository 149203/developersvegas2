import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux' // allows connecting redux to this react component
import { store_sign_in_stage } from '../../state/sign_in_stage'

class Sign_In_Email extends Component {
   render() {
      return (
         <div>
            <h3>Sign_In_Email</h3>
            <div className="col-12 mt-3">
               <button
                  className="btn btn-block btn-primary btn-lg"
                  onClick={() =>
                     this.props.store_sign_in_stage('Sign_In_Presentation')
                  }
               >
                  Next
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
)(withRouter(Sign_In_Email))
