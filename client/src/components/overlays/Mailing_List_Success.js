import React, { Component } from 'react'

class Sidebar_Mailing_List extends Component {
   render() {
      const close_modal = () => {
         this.props.store_mailing_list_success(false)
      }

      return (
         <div className="modal-content">
            <div className="modal-header">
               <h4 className="modal-title">We'll keep you in the loop!</h4>
               <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={close_modal}
               >
                  <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div className="modal-body">
               <p>
                  Thanks for signing up, {this.props.first_name}.
                  <br />
                  <br />
                  We'll email you about future events at {this.props.email}.
                  <br />
                  <br />
                  If you ever want to unsubscribe, click "Unsubscribe" in the
                  email you received.
               </p>
               <button
                  type="button"
                  className="btn btn-primary float-right"
                  onClick={close_modal}
               >
                  AWESOME
               </button>
            </div>
         </div>
      )
   }
}

export default Sidebar_Mailing_List
