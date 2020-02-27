import React from 'react'
import Video from '../uis/Video'
import friendly_format_date_without_day from '../../utils/friendly_format_date_without_day'

export default function Video_Card(props) {
   const { title, started_on, video_id, technologies } = props
   return (
      <div className="col-12 col-lg-6 mb-6 mb-xl-8">
         <div className="row">
            <div className="col-12 d-sm-none mb-2">
               <h3 className="font-weight-normal">{title}</h3>
            </div>

            <div className="col-12 col-sm-6 mb-2 mb-sm-0">
               <Video video_id={video_id} title={title} />
            </div>

            <div className="col-12 col-sm-6">
               <h4 className="d-none d-sm-block">{title}</h4>
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
