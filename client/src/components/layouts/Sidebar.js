import React from 'react'
import Sidebar_Mailing_List from '../sections/Sidebar_Mailing_List'
import Sidebar_Tech_Search from '../sections/Sidebar_Tech_Search'
import Sponsors from '../sections/Sponsors'

function Sidebar() {
   return (
      <div className="col-xl-3 d-none d-xl-block">
         <Sidebar_Mailing_List />
         <Sidebar_Tech_Search />
         <Sponsors />
      </div>
   )
}

export default Sidebar
