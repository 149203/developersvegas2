import React from 'react'
import Sidebar_Mailing_List from '../sections/Sidebar_Mailing_List'
import Sidebar_Tech_Search from '../sections/Sidebar_Tech_Search'
import Next_Event from '../sections/Next_Event'
import Past_Event_List from '../sections/Past_Event_List'

function Home() {
   return (
      <div className="container">
         <div className="row">
            <div className="col-12 mt-3">
               <h1 className="mb-4">Las Vegas Developers</h1>
            </div>
         </div>
         <div className="row">
            <div className="col-md-9">
               <Next_Event />
               <Past_Event_List />
            </div>
            <div className="col-md-3">
               <Sidebar_Mailing_List />
               <Sidebar_Tech_Search />
            </div>
         </div>
      </div>
   )
}

export default Home
