import React, { Component } from 'react'
import axios from 'axios'

class Developer extends Component {
   constructor() {
      super()
      const slug = window.location.pathname.slice(1)
      this.state = { developer: {} }

      axios
         .get(`/api/v1/presentations/${slug}`) // recall we put a PROXY value in our client package.json
         .then(res => {
            this.setState({ developer: res.data })
         })
         .catch(err => {
            console.log({ errors: err })
            window.location.replace('/404')
         }) // if there is an error here, redirect to the 404 page
   }

   render() {
      return (
         <div className="container">
            <div className="row">
               <div className="col-12 mt-3">
                  <h1 className="font-weight-light mb-3 mb-lg-4">
                     DEVELOPER NAME
                  </h1>
               </div>
            </div>
            <div className="row">
               <div className="col-12"></div>
            </div>
         </div>
      )
   }
}

export default Developer
