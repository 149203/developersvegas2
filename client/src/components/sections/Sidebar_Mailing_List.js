import React, { Component } from 'react'
import styled from 'styled-components'
import color from '../../style/colors'
import spacer from '../../style/spacers'
import classnames from 'classnames'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'

// import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux' // allows connecting redux to this react component
import { store_mailing_list_success } from '../../state/app'
import { store_current_member } from '../../state/current_member'

const Sidebar = styled.div`
   background-color: ${color.gray_100};
   padding: ${spacer[4]};
   input {
      margin-bottom: ${spacer[2]};
   }
`
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
            this.props.store_current_member(res.data)
            this.setState({
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
         <Sidebar>
            <h4>Stay in the loop</h4>
            <p>We'll email you about upcoming events, never spam.</p>
            <form
               noValidate // noValidate turns off HTML5 validation
               onSubmit={e => this.on_submit(e)}
            >
               <div className="form-group">
                  <label htmlFor="first_name">First name</label>
                  <input
                     id="first_name"
                     name="first_name"
                     className={classnames('form-control form-control-sm', {
                        'is-invalid': errors.first_name,
                     })}
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
                  <label htmlFor="last_name">Last name</label>
                  <input
                     id="last_name"
                     name="last_name"
                     className={classnames('form-control form-control-sm', {
                        'is-invalid': errors.last_name,
                     })}
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
                  <label htmlFor="email">Email</label>
                  <input
                     id="email"
                     name="email"
                     className={classnames('form-control form-control-sm', {
                        'is-invalid': errors.email,
                     })}
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
                  <input
                     type="submit"
                     value="Occasionally email me"
                     className="btn btn-sm btn-primary float-right mt-2"
                  />
               </div>
            </form>
            <div className="clearfix"></div>

            {/*
               MAH DUDE
               If you want to break the modal into its own component, you'll have to use Redux (or a parent component, but you don't want that).
               Because the open and closed state of the modal exists in this component AND the modal component, so you must share its state.
            */}

            <Modal
               show={this.props.stored_has_signed_up_for_mailing_list}
               onHide={close_success_modal}
            >
               <Modal.Header closeButton>
                  <Modal.Title>We'll keep you in the loop!</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <p>
                     Thanks for signing up, {this.props.stored_first_name}.
                     We'll let you know about future events.
                  </p>
                  <button
                     className="btn btn-primary float-right"
                     onClick={close_success_modal}
                  >
                     AWESOME
                  </button>
               </Modal.Body>
            </Modal>
         </Sidebar>
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
   }
} // wrap the return in () to use arrow function syntax for return shortcut
export default connect(
   map_store_to_props, // mapStateToProps
   { store_mailing_list_success, store_current_member } // mapDispatchToProps, here an 'action creator' wrapped in an object
)(withRouter(Sidebar_Mailing_List))
