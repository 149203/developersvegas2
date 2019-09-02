import React from 'react'
import Sidebar_Mailing_List from '../sections/Sidebar_Mailing_List'
import Sidebar_Tech_Search from '../sections/Sidebar_Tech_Search'

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
            <div className="col-3">
               <Sidebar_Mailing_List />
               <Sidebar_Tech_Search />
            </div>
         </div>
      </div>
   )
}

export default Home
