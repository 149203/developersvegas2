import React, { Component } from 'react'
import axios from 'axios'
import Header from '../sections/Header'
import Developer_Bio from '../sections/Developer_Bio'
import Video_Card from '../sections/Video_Card'
import is_empty from '../../utils/is_empty'

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
            // window.location.replace('/404')
         }) // if there is an error here, redirect to the 404 page
   }

   render() {
      const {
         first_name,
         last_name,
         _id,
         bio,
         unique_technologies,
         presentations,
      } = this.state.developer

      return (
         <div>
            <Header />
            <div className="container">
               <div className="row">
                  {!is_empty(this.state.developer) && (
                     <div>
                        <div className="row">
                           <Developer_Bio
                              _id={_id}
                              first_name={first_name}
                              last_name={last_name}
                              bio={bio}
                              unique_technologies={unique_technologies}
                           />
                        </div>
                        <div className="row">
                           {presentations
                              .filter(presentation => presentation.is_active)
                              .map(presentation => (
                                 <Video_Card
                                    _id={presentation._id}
                                    slug={presentation.slug}
                                    title={presentation.title}
                                    started_on={presentation.event_started_on}
                                    video_id={presentation.video_id}
                                    video_screenshot_url={
                                       presentation.video_screenshot_url
                                    }
                                    video_screenshot_with_play_url={
                                       presentation.video_screenshot_with_play_url
                                    }
                                    video_url={presentation.video_url}
                                    video_iframe={presentation.video_iframe}
                                    technologies={presentation.technologies}
                                    key={presentation._id}
                                 />
                              ))}
                        </div>
                     </div>
                  )}
               </div>
               <div className="row">
                  <div className="col-12"></div>
               </div>
            </div>
         </div>
      )
   }
}

export default Developer
