import React from 'react'
import friendly_format_date_without_day from '../../utils/friendly_format_date_without_day'

export default function Video_Card(props) {
   const {
      _id,
      slug,
      title,
      started_on,
      video_id,
      video_screenshot_url,
      video_screenshot_with_play_url,
      video_url,
      video_iframe,
      technologies,
   } = props
   return (
      <div className="col-12 col-lg-6 mb-4 mb-md-6 mb-xl-8">
         <div className="row">
            <div className="col-6">
               <div
                  style={{
                     padding: '56.25% 0 0 0',
                     position: 'relative',
                  }}
               >
                  <iframe
                     src={`https://player.vimeo.com/video/${video_id}?color=ffffff&title=0&byline=0&portrait=0`}
                     style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                     }}
                     frameBorder="0"
                     allow="autoplay; fullscreen"
                     allowFullScreen
                     title={`A video iframe: ${title}`}
                  ></iframe>
               </div>
            </div>

            <div className="col-6">
               <h4>{title}</h4>
               <p className="text-muted">
                  {friendly_format_date_without_day(started_on)}
               </p>
               <p>
                  {technologies.length > 0 && <span>Tags: &nbsp;</span>}
                  {technologies
                     .filter(technology => technology.is_active)
                     .map((technology, i, arr) => {
                        return (
                           <span key={technology._id}>
                              {technology.name}
                              {i < arr.length - 1 ? ', ' : ''}
                           </span>
                        )
                     })}
               </p>
            </div>
         </div>
      </div>
   )
}
