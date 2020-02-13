import React from 'react'
import Mailing_List from '../uis/Mailing_List'
import Sponsors from '../uis/Sponsors'

const Sidebar = () => {
   return (
      <div className="p-4 pb-0 bg-light">
         <Mailing_List />

         <Sponsors />
      </div>
   )
}

export default Sidebar
