import React from 'react'
import Mailing_List from '../uis/Mailing_List'
import Sponsors from '../uis/Sponsors'

const Callout = props => {
   if (props.contents === 'Mailing_List') {
      return (
         <div>
            <div className="pt-4 pb-2 px-4 bg-light d-xl-none">
               <Mailing_List />
            </div>
            <br />
         </div>
      )
   }
   if (props.contents === 'Sponsors') {
      return (
         <div>
            <div className="p-4 bg-light d-xl-none">
               <Sponsors />
            </div>
            <br />
         </div>
      )
   } else return null
}

export default Callout
