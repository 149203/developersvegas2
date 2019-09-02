import React from 'react'
import SidebarMailingList from '../sections/SidebarMailingList'
import SidebarTechSearch from '../sections/SidebarTechSearch'

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
               <SidebarMailingList />
               <SidebarTechSearch />
            </div>
         </div>
      </div>
   )
}

export default Home
