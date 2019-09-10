import React from 'react'

function Next_Event() {
   return (
      <div>
         <h3 className="mb-1">Next event</h3>
         <hr className="mt-0" />
         <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6">
               <h4>Demo Day - Saturday, July 13th, 2019</h4>
               <div className="row">
                  <div className="col-2">
                     <p>Time:</p>
                  </div>
                  <div className="col-10">
                     <p>Noon to 3pm</p>
                  </div>
               </div>
               <div className="row">
                  <div className="col-2">
                     <p>Place:</p>
                  </div>
                  <div className="col-10">
                     <p>
                        <a href="https://www.innevation.com/" target="_blank">
                           Innevation Center
                           <br />
                           6795 S Edmond St.
                           <br />
                           3rd Floor
                           <br />
                           Las Vegas, NV 89118
                        </a>
                     </p>
                  </div>
               </div>
               <div className="row">
                  <div className="col-2">
                     <p>Cost:</p>
                  </div>
                  <div className="col-10">
                     <p>Free + free food!</p>
                  </div>
               </div>
               <div className="row">
                  <div className="col-2">
                     <p>Details:</p>
                  </div>
                  <div className="col-10">
                     <p>
                        Demo Day is an "open mic" event for coders to show and
                        tell what they're working on. Sign up at noon. All ages,
                        programming languages, and skill levels are welcome.
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <div className="clearfix"></div>
      </div>
   )
}

export default Next_Event
