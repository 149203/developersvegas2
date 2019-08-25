import React from 'react'
import styled from 'styled-components'
import color from '../../style/colors'
import spacer from '../../style/spacers'

const Sidebar = styled.div`
   background-color: ${color.gray_100};
   padding: ${spacer[5]};
   input {
      margin-bottom: ${spacer[2]};
   }
`

function Sidebar_Mailing_List() {
   return (
      <Sidebar>
         <h4>Stay in the loop</h4>
         <p>We'll email you about upcoming events, never spam.</p>
         <label for="mailing_list_first_name">First name</label>
         <input
            id="mailing_list_first_name"
            className="form-control"
            type="text"
         ></input>
         <label for="mailing_list_last_name">Last name</label>
         <input
            id="mailing_list_last_name"
            className="form-control"
            type="text"
         ></input>
         <label for="mailing_list_email">Email</label>
         <input
            id="mailing_list_email"
            className="form-control"
            type="text"
         ></input>
         <button className="btn btn-primary float-right mt-2">
            Occasionally email me
         </button>
         <div className="clearfix"></div>
      </Sidebar>
   )
}

export default Sidebar_Mailing_List
