import React, { Component } from 'react'
import axios from 'axios'
import { format as format_date } from 'date-fns'
import find_index from 'lodash/findIndex'
import move_index from '../../utils/move_index'
import classnames from 'classnames'
import shuffle from 'lodash/shuffle'

class List extends Component {
   constructor(props) {
      super(props)
      this.state = {
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
               // arbitrarily assigning a number to the presentations before shuffle
               presentation.order = i
               return presentation
            })
            this.setState({ next_event })
         })
         .catch(err => console.log({ errors: err.response.data }))
   }

   select_radio(selected_radio_id) {
      this.setState({ selected_radio_id })
   }

   move_up() {
      const id = this.state.selected_radio_id // whichever radio button is selected
      if (id) {
         let presentations = [...this.state.next_event.presentations]
         let index = find_index(presentations, presentation => {
            return presentation._id === id
         })
         if (index === 0) return
         move_index(presentations, index, index - 1)
         // reorder
         presentations.map((presentation, i) => {
            presentation.order = i
            return presentation
         })
         const next_event = { ...this.state.next_event }
         next_event.presentations = presentations
         this.setState({ next_event })
      }
   }

   move_down() {
      const id = this.state.selected_radio_id // whichever radio button is selected
      if (id) {
         let presentations = [...this.state.next_event.presentations]
         let index = find_index(presentations, presentation => {
            return presentation._id === id
         })
         if (index + 1 >= presentations.length) return
         move_index(presentations, index, index + 1)
         // reorder
         presentations.map((presentation, i) => {
            presentation.order = i
            return presentation
         })
         const next_event = { ...this.state.next_event }
         next_event.presentations = presentations
         this.setState({ next_event })
      }
   }

   strike() {
      const id = this.state.selected_radio_id // whichever radio button is selected
      if (id) {
         let presentations = [...this.state.next_event.presentations]
         presentations.forEach(presentation => {
            if (presentation._id === id) {
               if (presentation.is_active) {
                  presentation.is_active = false
                  presentation.is_featured = false
               } else presentation.is_active = true
            }
         })
         const next_event = { ...this.state.next_event }
         next_event.presentations = presentations
         this.setState({ next_event })
      }
   }

   feature() {
      const id = this.state.selected_radio_id // whichever radio button is selected
      if (id) {
         let presentations = [...this.state.next_event.presentations]
         presentations.forEach(presentation => {
            if (presentation._id === id) {
               if (presentation.is_active) {
                  if (presentation.is_featured) {
                     presentation.is_featured = false
                  } else {
                     presentations.map(
                        presentation => (presentation.is_featured = false)
                     )
                     presentation.is_featured = true
                  }
               } else return
            } else return
         })
         const next_event = { ...this.state.next_event }
         next_event.presentations = presentations
         this.setState({ next_event })
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
   }

   save() {}

   render() {
      const show_featured = is_featured => {
         if (is_featured) return ' (FEATURED)'
         else return ''
      }

      return (
         <div style={{ overflowY: 'scroll', height: '100vh' }}>
            <div className="container">
               <div className="row">
                  <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3 mt-3">
                     <h1 className="mb-4 mb-sm-5">List admin</h1>

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

                     <div className="row">
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
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default List
