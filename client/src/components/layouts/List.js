import React, { Component } from 'react'
import axios from 'axios'
import { format as format_date } from 'date-fns'

class List extends Component {
   constructor(props) {
      super(props)
      this.state = { next_event: {} }

      const todays_datetime = format_date(new Date(), 'yyyyMMddkkmm')
      axios
         .get(`/api/v1/events?occurs=after&date=${todays_datetime}`) // recall we put a PROXY value in our client package.json
         .then(res => {
            this.setState({ next_event: res.data })
         })
         .catch(err => console.log({ errors: err.response.data }))
   }

   render() {
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
                              onClick={e => this.move_up('id')}
                           >
                              ▲ Up
                           </h4>
                        </div>
                        <div className="col-sm-3">
                           <h4
                              style={{ cursor: 'pointer' }}
                              onClick={e => this.move_down('id')}
                           >
                              ▼ Down
                           </h4>
                        </div>
                        <div className="col-sm-3">
                           <h4
                              style={{ cursor: 'pointer' }}
                              onClick={e => this.strike('id')}
                           >
                              ☠ Strike
                           </h4>
                        </div>

                        <div className="col-sm-3">
                           <h4
                              style={{ cursor: 'pointer' }}
                              onClick={e => this.feature('id')}
                           >
                              📽 Feature
                           </h4>
                        </div>
                     </div>

                     <div className="d-sm-none mb-5">
                        <h4
                           className="d-inline mr-4"
                           style={{ cursor: 'pointer' }}
                           onClick={e => this.move_up('id')}
                        >
                           ▲ Up
                        </h4>
                        <h4
                           className="d-inline mr-4"
                           style={{ cursor: 'pointer' }}
                           onClick={e => this.move_down('id')}
                        >
                           ▼ Down
                        </h4>
                        <h4
                           className="d-inline mr-4"
                           style={{ cursor: 'pointer' }}
                           onClick={e => this.strike('id')}
                        >
                           ☠ Strike
                        </h4>
                        <h4
                           className="d-inline"
                           style={{ cursor: 'pointer' }}
                           onClick={e => this.feature('id')}
                        >
                           📽 Feature
                        </h4>
                     </div>

                     <div className="custom-control custom-radio">
                        <input
                           type="radio"
                           id="presentation_id"
                           name="presentations"
                           className="custom-control-input"
                        />
                        <label
                           className="custom-control-label h5"
                           htmlFor="presentation_id"
                        >
                           <span className="font-weight-bold">Mike Zetlow</span>{' '}
                           - Mike's World Class Presentation
                        </label>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default List
