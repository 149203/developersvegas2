import React from 'react'
import Next_Event from '../sections/Next_Event'
import Past_Event_List from '../sections/Past_Event_List'
import Sidebar from '../layouts/Sidebar'
import Column_Mailing_List from '../sections/Column_Mailing_List'

function Home() {
   return (
      <div className="container">
         <div className="row">
            <div className="col-12 mt-3">
               <h1 className="mb-4">Las Vegas Developers</h1>
            </div>
         </div>
         <div className="row">
            <div className="col-xl-9 col-lg-12">
               <Next_Event />
               <Column_Mailing_List />
               <Past_Event_List />
            </div>
            <Sidebar />
         </div>
      </div>
   )
}

export default Home
