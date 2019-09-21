import React, { Component } from 'react'
import styled from 'styled-components'
import color from '../../style/colors'
import spacer from '../../style/spacers'
import axios from 'axios'
import classnames from 'classnames'
import Modal from 'react-bootstrap/Modal'

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
      // this.props.register_user(new_user)
      console.log(new_member)
      // axios POST!
      axios
         .post('/api/v1/members', new_member) // recall we put a PROXY value in our client package.json
         .then(res => {
            console.log(res.data)
            this.setState({
               errors: {},
               is_success_modal_open: true,
               first_name: '',
               last_name: '',
               email: '',
            })
         })
         .catch(err => this.setState({ errors: err.response.data }))
   }

   render() {
      const { errors } = this.state
      const close_success_modal = () =>
         this.setState({ is_success_modal_open: false })
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

            <Modal
               show={this.state.is_success_modal_open}
               onHide={close_success_modal}
            >
               <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  Woohoo, you're reading this text in a modal!
               </Modal.Body>
               <Modal.Footer></Modal.Footer>
            </Modal>
         </Sidebar>
      )
   }
}

export default Sidebar_Mailing_List
