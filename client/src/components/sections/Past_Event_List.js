import React from 'react'

function Past_Event_List() {
   return (
      <div>
         <h3 className="mb-1">Past events</h3>
         <hr className="mt-0" />
         <div className="row">
            <div className="col-md-12">
               <div className="row">
                  <div className="col-md-4">
                     <div
                        style={{
                           padding: '56.25% 0 0 0',
                           position: 'relative',
                        }}
                     >
                        <iframe
                           src="https://player.vimeo.com/video/353151534?color=ffffff&title=0&byline=0&portrait=0"
                           style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                           }}
                           frameborder="0"
                           allow="autoplay; fullscreen"
                           allowfullscreen
                        ></iframe>
                     </div>
                     <script src="https://player.vimeo.com/api/player.js"></script>
                  </div>
                  <div className="col-md-8 ml-n4 pr-0">
                     <h4>Demo Day - June 8th, 2019</h4>
                     <p className="text-justify">
                        This event saw presentations from Jose Figueroa, Peter
                        Couture, Veronica Saldivar, Robert Andersen, Karl
                        Kettelhut, Victor Evangelista, Tony Suriyathep, Chad
                        Columbus, Mike Zetlow (featured), Dorian Dominguez, Ben
                        Denzer, and Sunny Clark.
                     </p>
                     <p>
                        <a href="#" className="float-right">
                           See all videos from this event
                        </a>
                     </p>
                  </div>
               </div>
            </div>
         </div>

         <div className="clearfix"></div>
      </div>
   )
}

export default Past_Event_List
