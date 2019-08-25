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

function Home() {
   return (
      <div className="container">
         <div className="row">
            <div className="col-12 mt-3">
               <h1>Las Vegas Developers</h1>
            </div>
         </div>
         <div className="row">
            <div className="col-9">
               <h3>Next event</h3>
            </div>
            <Sidebar className="col-3">
               <h4>Stay in the loop</h4>
               <p>We'll email you about upcoming events. Never spam.</p>
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
            </Sidebar>
         </div>
      </div>
   )
}

export default Home
