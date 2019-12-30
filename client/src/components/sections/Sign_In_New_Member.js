import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux' // allows connecting redux to this react component
import { store_sign_in_stage } from '../../state/sign_in_stage'
import { store_current_member } from '../../state/current_member'
import classnames from 'classnames'
import axios from 'axios'

class Sign_In_New_Member extends Component {
   constructor(props) {
      super(props)
      this.state = {
         first_name: '',
         last_name: '',
         email: '',
         errors: {},
      }
   }

   on_change(e) {
      const new_state = { [e.target.id]: e.target.value } // shorthand for a variable property name!
      this.setState(new_state)
   }

   on_submit(e) {
      e.preventDefault() // because this is a form
      const { first_name, last_name, email } = this.state
      const new_member = {
         first_name,
         last_name,
         email,
      }
      // Call API
      axios
         .post('/api/v1/members', new_member) // recall we put a PROXY value in our client package.json
         .then(res => {
            // Store member in current_member redux store
            const { _id, first_name, last_name } = res.data
            this.props.store_current_member({ _id, first_name, last_name })
            this.setState({
               // resets the input fields
               first_name: '',
               last_name: '',
               email: '',
               errors: {},
            })
         })
         .catch(err => this.setState({ errors: err.response.data }))
   }

   render() {
      const { errors } = this.state

      return (
         <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3 mt-3">
               <h1 className="mb-4">Hi, it's good to meet you!</h1>
               <p className="d-none d-sm-block">
                  We'll email you about upcoming events, never spam.
               </p>
               <p className="d-sm-none">
                  We'll email you about upcoming events.
               </p>
               <div>
                  <form
                     noValidate // turns off HTML5 validation
                     onSubmit={e => this.on_submit(e)}
                  >
                     <div className="form-group mb-0">
                        <div className="row">
                           <div className="col-12">
                              <label htmlFor="first_name">First name</label>
                              <input
                                 id="first_name"
                                 name="first_name"
                                 className={
                                    classnames('form-control form-control-sm', {
                                       'is-invalid': errors.first_name,
                                    }) + ' mb-2'
                                 }
                                 type="text"
                                 autoComplete="fu-autocomplete"
                                 value={this.state.first_name}
                                 onChange={e => this.on_change(e)}
                              />
                              {errors.first_name && (
                                 <div className="invalid-feedback mt-n1 mb-3">
                                    {errors.first_name}
                                 </div>
                              )}
                           </div>

                           <div className="col-12 mt-2">
                              <label htmlFor="last_name">Last name</label>
                              <input
                                 id="last_name"
                                 name="last_name"
                                 className={
                                    classnames('form-control form-control-sm', {
                                       'is-invalid': errors.last_name,
                                    }) + ' mb-2'
                                 }
                                 type="text"
                                 autoComplete="fu-autocomplete"
                                 value={this.state.last_name}
                                 onChange={e => this.on_change(e)}
                              />
                              {errors.last_name && (
                                 <div className="invalid-feedback mt-n1 mb-3">
                                    {errors.last_name}
                                 </div>
                              )}
                           </div>

                           <div className="col-12 mt-2">
                              <label htmlFor="email">Email</label>
                              <input
                                 id="email"
                                 name="email"
                                 className={
                                    classnames('form-control form-control-sm', {
                                       'is-invalid': errors.email,
                                    }) + ' mb-2'
                                 }
                                 type="text"
                                 autoComplete="fu-autocomplete"
                                 value={this.state.email}
                                 onChange={e => this.on_change(e)}
                              />
                              {errors.email && (
                                 <div className="invalid-feedback mt-n1 mb-3">
                                    {errors.email}
                                 </div>
                              )}
                           </div>

                           <div className="offset-6 col-6 mt-2">
                              <input
                                 type="submit"
                                 value="Sign me up"
                                 className="btn btn-sm btn-primary btn-block mt-2"
                              />
                           </div>
                        </div>
                     </div>
                  </form>
                  <div className="clearfix"></div>
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
      stored_sign_in_stage: store.sign_in_stage,
   }
}
export default connect(
   map_store_to_props, // mapStateToProps
   { store_sign_in_stage, store_current_member } // mapDispatchToProps, here an 'action creator' wrapped in an object
)(withRouter(Sign_In_New_Member))
