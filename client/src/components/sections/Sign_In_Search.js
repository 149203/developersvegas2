import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux' // allows connecting redux to this react component
import axios from 'axios'
import escape_regex from 'lodash/escapeRegExp'
import { store_sign_in_stage } from '../../state/sign_in_stage'
import { store_current_member } from '../../state/current_member'

class Sign_In_Search extends Component {
   constructor() {
      super()
      this.state = {
         members: [],
         filtered_members: [],
         data_is_loaded: false,
      }
      axios
         .get(`/api/v1/members`) // recall we put a PROXY value in our client package.json
         .then(res => {
            const members = res.data
            this.setState({ members, data_is_loaded: true })
            document.getElementById('search_input').focus()
            // TODO: don't load the elements on the page until this data is returned from the API
         })
         .catch(err => console.log({ errors: err.response.data }))
   }

   search(e) {
      const input = e.target.value
      console.log(input)
      let filtered_members
      const members = [...this.state.members]
      if (input && members) {
         let input_regex = new RegExp('^' + escape_regex(input), 'i')
         filtered_members = members.filter(member => {
            return input_regex.test(member.last_name)
         })
      } else filtered_members = ''
      this.setState({ filtered_members })
   }

   sign_me_in(member) {
      this.props.store_current_member(member)
      // TODO: only go to Sign_In_Want_To_Present if presenters <= 18
      this.props.store_sign_in_stage('Sign_In_Want_To_Present')
   }

   im_new_here() {
      this.props.store_sign_in_stage('Sign_In_New_Member')
   }

   render() {
      return (
         <div>
            {this.state.data_is_loaded ? ( // wait for data to load before rendering page https://stackoverflow.com/a/46825893
               <div className="row">
                  <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3 mt-3">
                     <h1 className="mb-4">Sign in to Demo Day</h1>
                     <label htmlFor="search_input">
                        Type your <strong>LAST NAME</strong>
                     </label>
                     <input
                        className="form-control mb-4"
                        type="text"
                        id="search_input"
                        autoComplete="off"
                        onInput={e => {
                           this.search(e)
                        }}
                     ></input>

                     {this.state.filtered_members &&
                        this.state.filtered_members.map(member => {
                           return (
                              <div key={member._id}>
                                 <div className="row">
                                    <div className="col-7 col-xl-8">
                                       <h3 className="d-inline mr-4">{`${member.first_name} ${member.last_name}`}</h3>
                                    </div>
                                    <div className="col-5 col-xl-4">
                                       <button
                                          className="btn btn-primary btn-block"
                                          onClick={() =>
                                             this.sign_me_in({
                                                _id: member._id,
                                                first_name: member.first_name,
                                                last_name: member.last_name,
                                             })
                                          }
                                       >
                                          Sign me in
                                       </button>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col-12">
                                       <p className="mb-0 mt-1 mt-sm-0 text-break">
                                          {member.email}
                                       </p>
                                    </div>
                                 </div>

                                 <div className="row">
                                    <div className="col-12">
                                       <hr className="my-4" />
                                    </div>
                                 </div>
                              </div>
                           )
                        })}

                     <div className="row mt-2">
                        <div className="col-5 offset-7 col-xl-4 offset-xl-8">
                           <button
                              className="btn btn-success btn-block"
                              onClick={() => this.im_new_here()}
                           >
                              I'm new here
                           </button>
                        </div>
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
   return {} // must always return an object
}
export default connect(
   map_store_to_props, // mapStateToProps
   { store_sign_in_stage, store_current_member } // mapDispatchToProps, here an 'action creator' wrapped in an object
)(withRouter(Sign_In_Search))
