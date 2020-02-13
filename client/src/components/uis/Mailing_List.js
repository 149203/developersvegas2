import React, { Component } from 'react'
import classnames from 'classnames'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import slack_icon from '../../img/las-vegas-developers-coding-meetup-slack-icon.png'
import facebook_icon from '../../img/las-vegas-developers-coding-meetup-facebook-icon.png'
import meetup_icon from '../../img/las-vegas-developers-coding-meetup-meetup-icon.png'

// import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux' // allows connecting redux to this react component
import { store_mailing_list_success } from '../../state/app'
import { store_current_member } from '../../state/current_member'
import Mailing_List_Success from '../overlays/Mailing_List_Success'

class Sidebar_Mailing_List extends Component {
   constructor(props) {
      super(props)
      this.state = {
         first_name: '',
         last_name: '',
         email: '',
         errors: {},
      }
      this.props.store_mailing_list_success(false)
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
            // Store success modal variable in redux store
            this.props.store_mailing_list_success(true)
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
      const close_success_modal = () => {
         this.props.store_mailing_list_success(false)
      }

      return (
         <div>
            <div className="d-none d-xl-block">
               <h4>Stay in the loop</h4>
               <p>We'll email you about upcoming events, never spam.</p>
            </div>
            <div className="d-none d-md-block d-xl-none mb-2">
               <h4 className="d-inline mr-3">Stay in the loop</h4>
               <p className="d-inline">
                  We'll email you about upcoming events, never spam.
               </p>
            </div>
            <div className="d-none d-sm-block d-md-none mb-2">
               <h4 className="d-inline mr-3">Stay in the loop</h4>
               <p className="d-inline">
                  We'll email you only about upcoming events.
               </p>
            </div>
            <div className="d-sm-none">
               <h3>Stay in the loop</h3>
               <p>We'll email you only about upcoming events.</p>
            </div>
            <form
               noValidate // turns off HTML5 validation
               onSubmit={e => this.on_submit(e)}
            >
               <div className="form-group mb-0">
                  <div className="row">
                     <div className="col-12 col-sm-3 col-xl-12">
                        <label htmlFor="first_name">First name</label>
                        <input
                           id="first_name"
                           name="first_name"
                           className={classnames(
                              'form-control form-control-sm mb-2',
                              {
                                 'is-invalid': errors.first_name,
                              }
                           )}
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

                     <div className="col-12 col-sm-3 col-xl-12">
                        <label htmlFor="last_name">Last name</label>
                        <input
                           id="last_name"
                           name="last_name"
                           className={classnames(
                              'form-control form-control-sm mb-2',
                              {
                                 'is-invalid': errors.last_name,
                              }
                           )}
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

                     <div className="col-12 col-sm-3 col-xl-12">
                        <label htmlFor="email">Email</label>
                        <input
                           id="email"
                           name="email"
                           className={classnames(
                              'form-control form-control-sm mb-2',
                              {
                                 'is-invalid': errors.email,
                              }
                           )}
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

                     <div className="offset-6 col-6 d-sm-none d-xl-block">
                        <input
                           type="submit"
                           value="Sign me up"
                           className="btn btn-sm btn-primary btn-block mt-2"
                        />
                     </div>

                     <div className="d-none d-sm-block col-3 d-xl-none">
                        <input
                           type="submit"
                           value="Sign me up"
                           className="btn btn-sm btn-primary btn-block"
                           style={{ marginTop: '23px' }}
                        />
                     </div>
                  </div>
               </div>
            </form>

            <div className="mt-3 mt-xl-5 mb-2 mb-xl-0">
               <h4 className="d-none d-sm-block">Join our community</h4>
               <h3 className="d-sm-none mt-5 mb-2">Join our community</h3>

               <a
                  href="https://join.slack.com/t/lasvegasdevelopers/shared_invite/enQtOTQyODg1NzIyNDY0LTVjMjYzNDkwMjYxMmZjMTZhM2UwZjY5ZTZlODE3NDNjZWM3Yjg4MTk0YjNiZDlkMzkyNTRlOWI3OGJjY2U1MTc"
                  className="d-xl-block mb-3 mb-md-0 mb-xl-3 mr-5 mr-lg-6 d-inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="https://join.slack.com/t/lasvegasdevelopers/shared_invite/enQtOTQyODg1NzIyNDY0LTVjMjYzNDkwMjYxMmZjMTZhM2UwZjY5ZTZlODE3NDNjZWM3Yjg4MTk0YjNiZDlkMzkyNTRlOWI3OGJjY2U1MTc"
               >
                  <img src={slack_icon} alt="Slack icon"></img>
                  <p className="d-inline mt-4 ml-2">Las Vegas Developers</p>
               </a>
               <a
                  href="https://www.meetup.com/Las-Vegas-Developers/"
                  className="d-xl-block mb-3 mb-md-0 mb-xl-3 mr-5 mr-lg-6 d-inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="https://www.meetup.com/Las-Vegas-Developers/"
               >
                  <img src={meetup_icon} alt="Meetup icon"></img>
                  <p className="d-inline mt-4 ml-2">Las Vegas Developers</p>
               </a>
               <a
                  href="https://www.facebook.com/groups/free.code.camp.las.vegas.nv/"
                  className="d-xl-block mb-0 mb-xl-3 mr-5 mr-lg-6 d-inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="https://www.facebook.com/groups/free.code.camp.las.vegas.nv/"
               >
                  <img src={facebook_icon} alt="Facebook icon"></img>
                  <p className="d-inline mt-4 ml-2">Free Code Camp Las Vegas</p>
               </a>
            </div>

            <div className="clearfix"></div>

            <Modal
               show={this.props.stored_has_signed_up_for_mailing_list}
               onHide={close_success_modal}
            >
               <Mailing_List_Success
                  first_name={this.props.stored_first_name}
                  store_mailing_list_success={
                     this.props.store_mailing_list_success
                  }
                  email={this.props.stored_email}
               />
            </Modal>
         </div>
      )
   }
}

const map_store_to_props = store => {
   // so I can use stored values as props
   // https://stackoverflow.com/a/38678454
   return {
      stored_first_name: store.current_member.first_name,
      stored_has_signed_up_for_mailing_list:
         store.app.has_signed_up_for_mailing_list,
      stored_email: store.current_member.email,
   }
}
export default connect(
   map_store_to_props, // mapStateToProps
   { store_mailing_list_success, store_current_member } // mapDispatchToProps, here an 'action creator' wrapped in an object
)(withRouter(Sidebar_Mailing_List))
