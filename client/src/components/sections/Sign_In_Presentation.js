import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux' // allows connecting redux to this react component
import { store_sign_in_stage } from '../../state/sign_in_stage'
import classnames from 'classnames'
import axios from 'axios'
import ReactTags from 'react-tag-autocomplete'
// import is_empty from '../../utils/is_empty'

class Sign_In_Presentation extends Component {
   constructor(props) {
      super(props)
      this.state = {
         presentation_title: '',
         tags: [],
         suggestions: [],
         errors: {},
         data_is_loaded: false,
         has_accepted_agreement: false,
         agreement: null,
      }

      axios
         .get(`/api/v1/agreements/latest`) // recall we put a PROXY value in our client package.json
         .then(res => {
            this.setState({ agreement: res.data })
         })
         // .catch(err => console.log({ errors: err.response.data })) // TODO: put this back and sort it out!
         .catch(err => console.log({ errors: err }))

      axios
         .get(`/api/v1/technologies`) // recall we put a PROXY value in our client package.json
         .then(res => {
            this.setState({ suggestions: res.data, data_is_loaded: true })
            document.getElementById('presentation_title').focus()
         })
         // .catch(err => console.log({ errors: err.response.data })) // TODO: put this back and sort it out!
         .catch(err => console.log({ errors: err }))
   }

   on_change(e) {
      const new_state = { [e.target.id]: e.target.value } // shorthand for a variable property name!
      this.setState(new_state)
   }

   toggle_check(e) {
      const id = e.target.id
      if (this.state[id] === false) {
         this.setState({ [id]: true })
      } else this.setState({ [id]: false })
   }

   on_submit(e) {
      e.preventDefault() // because this is a form
      const { presentation_title, tags } = this.state
      const presentation = {
         title: presentation_title,
         technologies: tags,
         event_id: this.props.stored_next_event._id,
         event_started_on: this.props.stored_next_event.started_on,
         member_id: this.props.stored_current_member._id,
         agreement_id: this.state.agreement._id,
         has_accepted_agreement: this.state.has_accepted_agreement,
      }

      axios
         .post('/api/v1/presentations', presentation) // recall we put a PROXY value in our client package.json
         .then(res => {
            console.log(res.data)
            // this.props.store_sign_in_stage('Sign_In_Want_To_Present')
         })
         .catch(err => this.setState({ errors: err.response.data }))
   }

   onDelete(i) {
      const tags = this.state.tags.slice(0)
      tags.splice(i, 1)
      this.setState({ tags })
   }

   onAddition(tag) {
      const tags = [].concat(this.state.tags, tag)
      this.setState({ tags })
   }
   onValidate(tag) {
      return this.state.tags.length < 5
   }

   render() {
      const { errors } = this.state
      return (
         <div>
            {this.state.data_is_loaded ? ( // wait for data to load before rendering page https://stackoverflow.com/a/46825893
               <div className="row">
                  <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3 mt-3">
                     <h1 className="mb-4">Your presentation today</h1>
                     <div>
                        <form
                           noValidate // turns off HTML5 validation
                           onSubmit={e => this.on_submit(e)}
                        >
                           <div className="form-group mb-0">
                              <div className="row">
                                 <div className="col-12">
                                    <label htmlFor="presentation_title">
                                       Presentation title
                                    </label>
                                    <input
                                       id="presentation_title"
                                       name="presentation_title"
                                       className={classnames(
                                          'form-control mb-2',
                                          {
                                             'is-invalid': errors.title,
                                          }
                                       )}
                                       type="text"
                                       autoComplete="fu-autocomplete"
                                       value={this.state.presentation_title}
                                       onChange={e => this.on_change(e)}
                                    />
                                    {errors.title && (
                                       <div className="invalid-feedback mt-n1 mb-3">
                                          {errors.title}
                                       </div>
                                    )}
                                 </div>

                                 <div className="col-12 mt-2">
                                    <label htmlFor="presentation_technologies">
                                       What programming technologies did you
                                       use?
                                       <br />
                                       <span className="text-muted mb-2">
                                          (JavaScript, Amazon Alexa, PostgreSQL,
                                          etc.)
                                       </span>
                                    </label>
                                    <ReactTags
                                       tags={this.state.tags}
                                       suggestions={this.state.suggestions}
                                       onDelete={i => this.onDelete(i)}
                                       onAddition={tag => this.onAddition(tag)}
                                       delimiters={['Tab', 'Enter', ',']}
                                       minQueryLength={1}
                                       placeholderText={''}
                                       onValidate={tag => this.onValidate(tag)}
                                    />
                                    <div className="custom-control custom-checkbox mt-4">
                                       <input
                                          type="checkbox"
                                          className={classnames(
                                             'custom-control-input',
                                             {
                                                'is-invalid':
                                                   errors.has_accepted_agreement,
                                             }
                                          )}
                                          id="has_accepted_agreement"
                                          onChange={e => this.toggle_check(e)}
                                          checked={
                                             this.state.has_accepted_agreement
                                          }
                                       />
                                       <label
                                          className="custom-control-label text-dark"
                                          htmlFor="has_accepted_agreement"
                                       >
                                          {this.state.agreement.text}
                                       </label>
                                    </div>

                                    {errors.has_accepted_agreement && (
                                       <p className="mt-1 ml-5 text-danger">
                                          {errors.has_accepted_agreement}
                                       </p>
                                    )}
                                 </div>

                                 <div className="col-12 mt-2">
                                    <input
                                       type="submit"
                                       value="Sign up to present"
                                       className="btn btn-primary float-right mt-2"
                                    />
                                 </div>
                              </div>
                           </div>
                        </form>
                        <div className="clearfix"></div>
                     </div>
                  </div>
               </div>
            ) : null}
         </div>
      )
   }
}

const map_store_to_props = store => {
   // so I can use stored values as props
   // https://stackoverflow.com/a/38678454
   return {
      stored_sign_in_stage: store.sign_in_stage,
      stored_current_member: store.current_member,
      stored_next_event: store.next_event,
   }
}
export default connect(
   map_store_to_props, // mapStateToProps
   { store_sign_in_stage } // mapDispatchToProps, here an 'action creator' wrapped in an object
)(withRouter(Sign_In_Presentation))
