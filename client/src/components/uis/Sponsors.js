import React from 'react'
import vh_logo from '../../img/las-vegas-developers-coding-meetup-vehicle-history.png'
import dot_logo from '../../img/las-vegas-developers-coding-meetup-vegas-domain.png'

function Sponsors() {
   return (
      <div className="mt-xl-5">
         <h4 className="mb-3 d-none d-sm-block">Sponsored by</h4>
         <h3 className="mb-3 d-xs-block d-sm-none">Sponsored by</h3>

         <div className="row">
            <div className="col-12 col-md-4 col-xl-12 pr-md-4 pr-lg-4 pr-xl-2">
               <img
                  src={vh_logo}
                  className="mb-2 sponsor_logo_size"
                  alt="Vehicle History logo"
               />

               <p className="mb-0">
                  <a
                     href="https://www.vehiclehistory.com/"
                     target="_blank"
                     rel="noopener noreferrer"
                     title="https://www.vehiclehistory.com/"
                  >
                     VehicleHistory.com
                  </a>{' '}
                  believes everyone deserves access to unbiased, accurate
                  information about every vehicle—simplifying the research
                  process.
               </p>
               <hr className="d-block d-md-none d-xl-block" />
            </div>

            <div className="vr d-none d-md-block d-xl-none" />

            <div className="col-12 col-md-4 col-xl-12 pl-md-4 pl-lg-4 pl-xl-2">
               <img
                  src={dot_logo}
                  className="mb-2 sponsor_logo_size"
                  alt="Dot Vegas domains logo"
               />
               <p className="mb-0">
                  Enjoy an immediate affiliation to one of the most exciting
                  brands in the world. Host your web product on a{' '}
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
            </div>
         </div>
         <div className="clearfix"></div>
      </div>
   )
}

export default Sponsors
