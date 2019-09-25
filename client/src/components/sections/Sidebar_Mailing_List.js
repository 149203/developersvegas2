import React, { Component } from 'react'
import styled from 'styled-components'
import color from '../../style/colors'
import spacer from '../../style/spacers'
import classnames from 'classnames'
import Modal from 'react-bootstrap/Modal'

// import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux' // allows connecting redux to this react component
import { upsert_member } from '../../actions/signup_actions'

const Sidebar = styled.div`
   background-color: ${color.gray_100};
   padding: ${spacer[4]};
   input {
      margin-bottom: ${spacer[2]};
   }
`
class Sidebar_Mailing_List extends Component {
   constructor() {
      super()
      this.state = {
         first_name: '',
         last_name: '',
         email: '',
         errors: {},
         is_success_modal_open: false,
      }
   }

   componentWillReceiveProps(nextProps) {
      // deprecated way of passing props into component state
      // once we receive new properties, update component state
      if (nextProps.errors) {
         // if there is errors
         this.setState({ errors: nextProps.errors })
      }
   }

   on_change(e) {
      const new_state = { [e.target.id]: e.target.value }
      // console.log({ new_state })
      this.setState(new_state) // shorthand for a variable property name!
   }

   on_submit(e) {
      e.preventDefault() // because this is a form
      const { first_name, last_name, email } = this.state
      const new_member = {
         first_name,
         last_name,
         email,
      }

      this.props.upsert_member(new_member) // use new_member data in the upsert_member action // uses withRouter at the bottom of the page

      console.log(new_member)
      // axios POST!
      // axios
      //    .post('/api/v1/members', new_member) // recall we put a PROXY value in our client package.json
      //    .then(res => {
      //       console.log(res.data)
      //       this.setState({
      //          errors: {},
      //          is_success_modal_open: true,
      //       })
      //    })
      //    .catch(err => this.setState({ errors: err.response.data }))
   }

   render() {
      const { errors } = this.state
      const close_success_modal = () => {
         this.setState({
            is_success_modal_open: false,
            first_name: '',
            last_name: '',
            email: '',
         })
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
               show={this.state.is_success_modal_open}
               onHide={close_success_modal}
            >
               <Modal.Header closeButton>
                  <Modal.Title>We'll keep you in the loop!</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <p>
                     Thanks for signing up, {this.state.first_name}. We'll let
                     you know about future events.
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

// export default Sidebar_Mailing_List

const map_state_to_props = state => ({
   signup: {
      first_name: state.first_name,
      last_name: state.last_name,
      email: state.email,
   }, // we named signup in our root reducer (reducers/index.js)
   errors: state.errors,
}) // wrap the return in () to use arrow function syntax for return shortcut
export default connect(
   map_state_to_props,
   { upsert_member }
)(withRouter(Sidebar_Mailing_List))
