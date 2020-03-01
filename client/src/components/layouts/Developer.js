import React, { Component } from 'react'
import axios from 'axios'
import Header from '../sections/Header'
import Developer_Bio from '../sections/Developer_Bio'
import Video_Card from '../sections/Video_Card'
import is_empty from '../../utils/is_empty'
import Four_Oh_Four from '../layouts/Four_Oh_Four'

class Developer extends Component {
   constructor() {
      super()
      const slug = window.location.pathname.slice(1)
      this.state = { developer: {}, has_errors: false, has_loaded: false }

      axios
         .get(`/api/v1/presentations/${slug}`) // recall we put a PROXY value in our client package.json
         .then(res => {
            this.setState({ developer: res.data, has_loaded: true })
         })
         .catch(err => {
            console.log({ errors: err })
            this.setState({ has_errors: true })
            //window.location.replace('/404')
         }) // if there is an error here, redirect to the 404 page
   }

   render() {
      const {
         first_name,
         last_name,
         bio,
         unique_technologies,
         presentations,
      } = this.state.developer

      if (this.state.has_errors) return <Four_Oh_Four />
      else
         return (
            <div>
               {this.state.has_loaded && (
                  <div>
                     <Header />
                     <div className="container">
                        {!is_empty(this.state.developer) && (
                           <div>
                              <div className="row">
                                 <Developer_Bio
                                    first_name={first_name}
                                    last_name={last_name}
                                    bio={bio}
                                    unique_technologies={unique_technologies}
                                 />
                              </div>
                              <div className="row">
                                 {presentations
                                    .filter(
                                       presentation => presentation.is_active
                                    )
                                    .map(presentation => (
                                       <Video_Card
                                          title={presentation.title}
                                          started_on={
                                             presentation.event_started_on
                                          }
                                          video_id={presentation.video_id}
                                          technologies={
                                             presentation.technologies
                                          }
                                          key={presentation._id}
                                       />
                                    ))}
                              </div>
                           </div>
                        )}

                        <div className="row">
                           <div className="col-12"></div>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         )
   }
}

export default Developer
