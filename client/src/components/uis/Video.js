import React from 'react'

export default function Video(props) {
   const { video_id, title } = props
   return (
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
   )
}
