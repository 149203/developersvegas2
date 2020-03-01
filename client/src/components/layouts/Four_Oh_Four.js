import React from 'react'
import disappointed_image from '../../img/disappointed.gif'

export default function Four_Oh_Four() {
   return (
      <div className="container">
         <div className="row">
            <div className="col-12 mt-3">
               <h1 className="font-weight-light mb-3 mb-lg-4">
                  This page doesn't exist.
               </h1>
               <img
                  src={disappointed_image}
                  className=""
                  alt="Gif of Kevin Sorbo in Hercules saying he is disappointed."
               />

               <p className="lead mt-4 text-danger font-weight-bold">
                  {window.location.href} isn't a valid URL.&nbsp;
               </p>
               <p className="lead mt-4">
                  Click your browser's back button or go to the{' '}
                  <a href="/" title="https://www.developers.vegas">
                     Las Vegas Developers homepage
                  </a>
                  .
               </p>
            </div>
         </div>
      </div>
   )
}
