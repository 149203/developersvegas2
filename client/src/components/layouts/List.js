import React, { Component } from 'react'
import axios from 'axios'
import { format as format_date } from 'date-fns'
import find_index from 'lodash/findIndex'
import move_index from '../../utils/move_index'
import deep_copy from '../../utils/deep_copy'
import classnames from 'classnames'
import shuffle from 'lodash/shuffle'
import is_equal from 'lodash/isEqual'

class List extends Component {
   constructor(props) {
      super(props)
      this.state = {
         initial_next_event: {},
         next_event: {},
         selected_radio_id: '',
         has_feature: false,
         has_changes: false,
         is_saved: false,
      }

      const todays_datetime = format_date(new Date(), 'yyyyMMddkkmm')
      axios
         .get(`/api/v1/events?occurs=after&date=${todays_datetime}`) // recall we put a PROXY value in our client package.json
         .then(res => {
            const next_event = res.data
            next_event.presentations.map((presentation, i) => {
               // if there is a featured presentation from db data, update state
               if (presentation.is_featured)
                  this.setState({ has_feature: true })

               // arbitrarily assigning a number to the presentations before shuffle
               presentation.order = i
               return presentation
            })
            this.setState({
               initial_next_event: deep_copy(next_event),
               next_event,
            })
         })
         .catch(err => console.log({ errors: err.response.data }))
   }

   select_radio(selected_radio_id) {
      this.setState({ selected_radio_id })
   }

   move_up() {
      const id = this.state.selected_radio_id // whichever radio button is selected
      if (id) {
         const next_event = { ...this.state.next_event }
         const presentations = next_event.presentations
         const index = find_index(presentations, presentation => {
            return presentation._id === id
         })
         if (index === 0) return
         move_index(presentations, index, index - 1)
         // reorder
         presentations.map((presentation, i) => {
            presentation.order = i
            return presentation
         })
         this.setState({ next_event })
         is_equal(next_event, this.state.initial_next_event)
            ? this.setState({ has_changes: false })
            : this.setState({ has_changes: true })
      }
   }

   move_down() {
      const id = this.state.selected_radio_id // whichever radio button is selected
      if (id) {
         const next_event = { ...this.state.next_event }
         const presentations = next_event.presentations
         const index = find_index(presentations, presentation => {
            return presentation._id === id
         })
         if (index + 1 >= presentations.length) return
         move_index(presentations, index, index + 1)
         // reorder
         presentations.map((presentation, i) => {
            presentation.order = i
            return presentation
         })
         this.setState({ next_event })
         is_equal(next_event, this.state.initial_next_event)
            ? this.setState({ has_changes: false })
            : this.setState({ has_changes: true })
      }
   }

   strike() {
      const id = this.state.selected_radio_id // whichever radio button is selected
      if (id) {
         const next_event = { ...this.state.next_event }
         const presentations = next_event.presentations
         presentations.forEach(presentation => {
            if (presentation._id === id) {
               if (presentation.is_active) {
                  presentation.is_active = false
                  presentation.is_featured = false // HERE
               } else presentation.is_active = true
            }
         })
         const presentations_with_feature = presentations.filter(
            presentation => presentation.is_featured
         )
         if (presentations_with_feature.length === 0) {
            this.setState({ has_feature: false })
         }
         this.setState({ next_event })
         is_equal(next_event, this.state.initial_next_event)
            ? this.setState({ has_changes: false })
            : this.setState({ has_changes: true })
      }
   }

   feature() {
      const id = this.state.selected_radio_id // whichever radio button is selected
      if (id) {
         const next_event = { ...this.state.next_event }
         const presentations = next_event.presentations
         presentations.forEach(presentation => {
            if (presentation._id === id) {
               if (presentation.is_active) {
                  if (presentation.is_featured) {
                     presentation.is_featured = false
                     this.setState({ has_feature: false })
                  } else {
                     presentations.map(
                        // reset all to is_featured: false
                        presentation => (presentation.is_featured = false)
                     )
                     presentation.is_featured = true
                     this.setState({ has_feature: true })
                  }
               } else return
            } else return
         })
         // next_event.presentations = presentations
         this.setState({ next_event })
         is_equal(next_event, this.state.initial_next_event)
            ? this.setState({ has_changes: false })
            : this.setState({ has_changes: true })
      }
   }

   shuffle() {
      const presentations = shuffle([...this.state.next_event.presentations])
      const next_event = { ...this.state.next_event }
      next_event.presentations = presentations
      // reorder
      presentations.map((presentation, i) => {
         presentation.order = i
         return presentation
      })
      this.setState({ next_event })
      is_equal(next_event, this.state.initial_next_event)
         ? this.setState({ has_changes: false })
         : this.setState({ has_changes: true })
   }

   save() {
      this.setState({
         is_saved: true,
         has_changes: false,
         initial_next_event: deep_copy(this.state.next_event),
      })
   }

   render() {
      const show_featured = is_featured => {
         if (is_featured) return ' (FEATURED)'
         else return ''
      }

      const show_saved_alert = page_state => {
         const { is_saved, has_feature, has_changes } = page_state
         if (is_saved && has_feature && !has_changes) {
            return (
               <div className="row">
                  <div className="col-12">
                     <div className="alert alert-secondary" role="alert">
                        <strong>Saved!</strong>
                     </div>
                  </div>
               </div>
            )
         } else if (is_saved && !has_feature && !has_changes) {
            return (
               <div className="row">
                  <div className="col-12">
                     <div className="alert alert-warning" role="alert">
                        <strong>Saved.</strong> But remember to select a
                        featured presentation.
                     </div>
                  </div>
               </div>
            )
         } else if (has_changes) {
            return (
               <div className="row">
                  <div className="col-12">
                     <div className="alert alert-danger" role="alert">
                        Changes made, but <strong>not saved.</strong>
                     </div>
                  </div>
               </div>
            )
         }
      }

      const { is_saved, has_changes, has_feature } = this.state

      return (
         <div style={{ overflowY: 'scroll', height: '100vh' }}>
            <div className="container">
               <div className="row mt-3">
                  <div className="col-12 col-md-10 offset-md-1 offset-lg-0 col-lg-8 col-xl-6 offset-xl-1 mr-lg-n6">
                     <h1 className="mb-4 mb-sm-5">List admin</h1>
                  </div>
                  <div className="col-12 col-md-10 offset-md-1 offset-lg-0 col-lg-8 col-xl-6 offset-xl-1 mr-lg-n6">
                     <div className="row d-none d-sm-flex mb-5">
                        <div className="col-sm-3">
                           <h4
                              style={{ cursor: 'pointer' }}
                              onClick={e => this.move_up()}
                           >
                              ▲ Up
                           </h4>
                        </div>
                        <div className="col-sm-3">
                           <h4
                              style={{ cursor: 'pointer' }}
                              onClick={e => this.move_down()}
                           >
                              ▼ Down
                           </h4>
                        </div>
                        <div className="col-sm-3">
                           <h4
                              style={{ cursor: 'pointer' }}
                              onClick={e => this.strike()}
                           >
                              ☠ Strike
                           </h4>
                        </div>

                        <div className="col-sm-3">
                           <h4
                              style={{ cursor: 'pointer' }}
                              onClick={e => this.feature()}
                           >
                              📽 Feature
                           </h4>
                        </div>
                     </div>

                     <div className="d-sm-none mb-5">
                        <h4
                           className="d-inline mr-4"
                           style={{ cursor: 'pointer' }}
                           onClick={e => this.move_up()}
                        >
                           ▲ Up
                        </h4>
                        <h4
                           className="d-inline mr-4"
                           style={{ cursor: 'pointer' }}
                           onClick={e => this.move_down()}
                        >
                           ▼ Down
                        </h4>
                        <h4
                           className="d-inline mr-4"
                           style={{ cursor: 'pointer' }}
                           onClick={e => this.strike()}
                        >
                           ☠ Strike
                        </h4>
                        <h4
                           className="d-inline"
                           style={{ cursor: 'pointer' }}
                           onClick={e => this.feature()}
                        >
                           📽 Feature
                        </h4>
                     </div>

                     {this.state.next_event.presentations && (
                        <div>
                           {this.state.next_event.presentations.map(
                              presentation => {
                                 return (
                                    <div
                                       className="custom-control custom-radio mb-3"
                                       key={presentation._id}
                                    >
                                       <input
                                          type="radio"
                                          id={presentation._id}
                                          name="presentations"
                                          className="custom-control-input"
                                          onChange={e =>
                                             this.select_radio(e.target.id)
                                          }
                                       />
                                       <label
                                          className={classnames(
                                             'custom-control-label h5',
                                             {
                                                'text-strikethrough': !presentation.is_active,
                                             }
                                          )}
                                          htmlFor={presentation._id}
                                       >
                                          <span className="font-weight-bold">
                                             {`${presentation.order + 1}. ${
                                                presentation.member_id
                                                   .first_name
                                             } ${
                                                presentation.member_id.last_name
                                             }`}
                                          </span>
                                          {` - ${presentation.title}`}
                                          <span className="font-weight-bold">
                                             {show_featured(
                                                presentation.is_featured
                                             )}
                                          </span>
                                       </label>
                                    </div>
                                 )
                              }
                           )}
                        </div>
                     )}

                     <div className="row mb-5 mt-4">
                        <div className="col-12">
                           <button
                              className="btn btn-primary float-right ml-4 px-9"
                              onClick={e => this.save()}
                           >
                              Save
                           </button>
                           <button
                              className="btn btn-outline-secondary float-right"
                              onClick={e => this.shuffle()}
                           >
                              Shuffle
                           </button>
                        </div>
                     </div>

                     {show_saved_alert({ is_saved, has_feature, has_changes })}
                  </div>
                  <div className="col-12 col-md-10 offset-md-1 offset-lg-0 col-lg-4 col-xl-4 ml-lg-5 pl-lg-6 mt-lg-n2">
                     <h3 className="d-none d-sm-block">Event procedures</h3>
                     <h3 className="d-sm-none font-weight-bold">
                        Event procedures
                     </h3>
                     <h4 className="d-none d-sm-block mt-4 mb-3">Schedule</h4>
                     <h4 className="d-sm-none mt-4 mb-3 font-weight-bold">
                        Schedule
                     </h4>
                     <p className="mb-2">
                        12:00pm - 12:30pm:&nbsp;&nbsp;Sign in and pizza
                     </p>
                     <p className="mb-2">12:30pm - 1:15pm:&nbsp;&nbsp;Demos</p>
                     <p className="mb-2">
                        1:15pm - 1:35pm:&nbsp;&nbsp;Mingle time
                     </p>
                     <p className="mb-2">1:35pm - 2:20pm:&nbsp;&nbsp;Demos</p>
                     <p className="mb-2">
                        2:20pm - 3:00pm:&nbsp;&nbsp;Mingle time
                     </p>
                     <h4 className="d-none d-sm-block mt-6 mb-3">
                        Featured presentation checklist
                     </h4>
                     <h4 className="d-sm-none mt-6 mb-3 font-weight-bold">
                        Featured presentation checklist
                     </h4>
                     <p className="mb-2">
                        1. There are no technical difficulties in the
                        presentation (on our end or theirs).
                     </p>
                     <p className="mb-2">
                        2. Presenter demos code or a working application.
                     </p>
                     <p className="mb-2">
                        3. There is time and effort put into the presentation.
                     </p>
                     <p className="mb-2">
                        4. The presentation is enlightening or entertaining.
                     </p>
                     <p className="mb-2">
                        5. The presenter has a strong speaking or presenting
                        presence.
                     </p>
                     <p className="mb-2">
                        6. The presentation isn't offensive or borderline
                        offensive.
                     </p>
                     <p className="mb-2">
                        7. The presentation appeals to programmers and
                        non-programmers alike.
                     </p>
                     <p className="mb-2">
                        8. The presentation shows our diversity (of languages,
                        skill levels, and demographics).
                     </p>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default List
