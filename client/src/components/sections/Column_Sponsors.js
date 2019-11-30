import React from 'react'
import styled from 'styled-components'
import color from '../../style/colors'
import spacer from '../../style/spacers'
import vh_logo from '../../img/las-vegas-developers-coding-meetup-vehicle-history.png'
import chsi_logo from '../../img/las-vegas-developers-coding-meetup-chsi-technologies.svg'
import dot_logo from '../../img/las-vegas-developers-coding-meetup-vegas-domain.png'

const Sidebar = styled.div`
   background-color: ${color.gray_100};
   padding: ${spacer[4]};
   input {
      margin-bottom: ${spacer[2]};
   }
`

function Column_Sponsors() {
   return (
      <Sidebar>
         <h4 className="mb-3">Sponsored by</h4>

         <div className="row">
            <div className="col-12 mb-2">
               <img
                  src={vh_logo}
                  style={{ height: '40px' }}
                  alt="Vehicle History logo"
               />
            </div>
         </div>
         <p>
            <a
               href="https://www.vehiclehistory.com/"
               target="_blank"
               rel="noopener noreferrer"
               title="https://www.vehiclehistory.com/"
            >
               VehicleHistory.com
            </a>{' '}
            believes everyone deserves access to unbiased, accurate information
            about every vehicle—simplifying the research process.
         </p>
         <hr />

         <div className="row">
            <div className="col-12 mb-2">
               <img
                  src={chsi_logo}
                  style={{ height: '40px' }}
                  alt="CHSI Technologies logo"
               />
            </div>
         </div>
         <p>
            CHSI Technologies makes{' '}
            <a
               href="https://chsiconnections.com/"
               target="_blank"
               rel="noopener noreferrer"
               title="https://chsiconnections.com/"
            >
               Connections
            </a>
            —award-winning insurance and risk management software—with a team of
            some of the best developers in Las Vegas.
         </p>
         <hr />

         <div className="row">
            <div className="col-12 mb-2">
               <img
                  src={dot_logo}
                  style={{ height: '40px' }}
                  alt="Dot Vegas domains logo"
               />
            </div>
         </div>
         <p className="mb-0">
            Enjoy an immediate affiliation to one of the most exciting brands in
            the world. Host your web product on a{' '}
            <a
               href="http://the.vegas/"
               target="_blank"
               rel="noopener noreferrer"
               title="http://the.vegas/"
            >
               .Vegas domain
            </a>
            .
         </p>

         <div className="clearfix"></div>
      </Sidebar>
   )
}

export default Column_Sponsors
