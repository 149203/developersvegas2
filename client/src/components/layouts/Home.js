import React from 'react'
import Next_Event from '../sections/Next_Event'
import Past_Event_List from '../sections/Past_Event_List'
import Sidebar from '../sections/Sidebar'
import Callout from '../sections/Callout'

function Home() {
   return (
      <div className="container">
         <div className="row">
            <div className="col-12 mt-3">
               <h1 className="mb-3 mb-lg-4">Las Vegas Developers</h1>
            </div>
         </div>
         <div className="row">
            <div className="col-xl-9 col-lg-12">
               <Next_Event />
               <Callout contents="Mailing_List" />
               <Past_Event_List />
               <Callout contents="Sponsors" />
            </div>
            <div className="col-xl-3 d-none d-xl-block">
               <Sidebar />
            </div>
         </div>
      </div>
   )
}

export default Home
