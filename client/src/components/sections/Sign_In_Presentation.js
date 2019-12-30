import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux' // allows connecting redux to this react component
import { store_sign_in_stage } from '../../state/sign_in_stage'
import classnames from 'classnames'
import axios from 'axios'
import ReactTags from 'react-tag-autocomplete'

class Sign_In_Presentation extends Component {
   constructor(props) {
      super(props)
      this.state = {
         presentation_title: '',
         presentation_technologies: [],
         tags: [],
         suggestions: [],
         errors: {},
      }

      axios
         .get(`/api/v1/technologies`) // recall we put a PROXY value in our client package.json
         .then(res => {
            this.state.suggestions = res.data
            document.getElementById('presentation_title').focus()
            // TODO: don't load the elements on the page until this data is returned from the API
         })
         .catch(err => console.log({ errors: err.response.data }))
   }

   on_change(e) {
      const new_state = { [e.target.id]: e.target.value } // shorthand for a variable property name!
      this.setState(new_state)
   }

   on_submit(e) {
      e.preventDefault() // because this is a form
      const { presentation_title, presentation_technologies } = this.state
      const presentation = {
         title: presentation_title,
         technologies: presentation_technologies,
      }
      console.log(presentation)
      // Call API
      // axios
      //    .post('/api/v1/members', new_member) // recall we put a PROXY value in our client package.json
      //    .then(res => {
      //       // Store member in current_member redux store
      //       const { _id, first_name, last_name } = res.data
      //       this.props.store_current_member({ _id, first_name, last_name })
      //       this.props.store_sign_in_stage('Sign_In_Want_To_Present')
      //    })
      //    .catch(err => this.setState({ errors: err.response.data }))
   }

   handleDelete(i) {
      const tags = this.state.tags.slice(0)
      tags.splice(i, 1)
      this.setState({ tags })
   }

   handleAddition(tag) {
      const tags = [].concat(this.state.tags, tag)
      this.setState({ tags })
   }
   handleValidate(tag) {
      // what happens on validate
      return this.state.tags.length < 5
   }

   render() {
      const { errors } = this.state

      return (
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
                                 className={classnames('form-control mb-2', {
                                    'is-invalid': errors.presentation_title,
                                 })}
                                 type="text"
                                 autoComplete="fu-autocomplete"
                                 value={this.state.presentation_title}
                                 onChange={e => this.on_change(e)}
                              />
                              {errors.first_name && (
                                 <div className="invalid-feedback mt-n1 mb-3">
                                    {errors.presentation_title}
                                 </div>
                              )}
                           </div>

                           <div className="col-12 mt-2">
                              <label htmlFor="presentation_technologies">
                                 What technologies did you use?
                              </label>
                              <ReactTags
                                 tags={this.state.tags}
                                 suggestions={this.state.suggestions}
                                 handleDelete={this.handleDelete.bind(this)}
                                 handleAddition={this.handleAddition.bind(this)}
                                 delimiters={[9, 13, 188]}
                                 minQueryLength={1}
                                 placeholder={'Add a technology'}
                                 handleValidate={this.handleValidate.bind(this)}
                              />
                              {/* <input
                                 id="presentation_technologies"
                                 name="presentation_technologies"
                                 className={classnames('form-control mb-2', {
                                    'is-invalid':
                                       errors.presentation_technologies,
                                 })}
                                 type="text"
                                 autoComplete="fu-autocomplete"
                                 value={this.state.presentation_technologies}
                                 onChange={e => this.on_change(e)}
                              /> */}
                              {/* {errors.presentation_technologies && (
                                 <div className="invalid-feedback mt-n1 mb-3">
                                    {errors.presentation_technologies}
                                 </div>
                              )} */}
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
)(withRouter(Sign_In_Presentation))
