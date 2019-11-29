import React from 'react'
import Sidebar_Mailing_List from '../sections/Sidebar_Mailing_List'
import Sidebar_Tech_Search from '../sections/Sidebar_Tech_Search'
import Sidebar_Sponsors from '../sections/Sidebar_Sponsors'

function Sidebar() {
   return (
      <div className="col-xl-3 d-none d-xl-block">
         <Sidebar_Mailing_List />
         <Sidebar_Tech_Search />
         <Sidebar_Sponsors />
      </div>
   )
}

export default Sidebar
