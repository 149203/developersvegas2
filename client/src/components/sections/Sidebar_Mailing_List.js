import React, { Component } from 'react'
import styled from 'styled-components'
import color from '../../style/colors'
import spacer from '../../style/spacers'

const Sidebar = styled.div`
   background-color: ${color.gray_100};
   padding: ${spacer[4]};
   input {
      margin-bottom: ${spacer[2]};
   }
   /* button.btn-primary {
      border: ${color.blue_600} 1px solid;
   } */
`
class Sidebar_Mailing_List extends Component {
   constructor() {
      super()
      this.state = {
         first_name: '',
         last_name: '',
         email: '',
      }
   }

   render() {
      return (
         <Sidebar>
            <h4>Stay in the loop</h4>
            <p>We'll email you about upcoming events, never spam.</p>
            <label for="mailing_list_first_name">First name</label>
            <input
               id="mailing_list_first_name"
               className="form-control form-control-sm"
               type="text"
               autocomplete="fu-autocomplete"
            ></input>
            <label for="mailing_list_last_name">Last name</label>
            <input
               id="mailing_list_last_name"
               className="form-control form-control-sm"
               type="text"
               autocomplete="fu-autocomplete"
            ></input>
            <label for="mailing_list_email">Email</label>
            <input
               id="mailing_list_email"
               className="form-control form-control-sm"
               type="text"
               autocomplete="fu-autocomplete"
            ></input>
            <button className="btn btn-sm btn-primary float-right mt-2">
               Occasionally email me
            </button>
            <div className="clearfix"></div>
         </Sidebar>
      )
   }
}

export default Sidebar_Mailing_List
