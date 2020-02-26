import React from 'react'

export default function Developer_Bio(props) {
   console.log(props)
   const { first_name, last_name, _id, bio, unique_technologies } = props
   const technologies_text = 'HTML, CSS' // TODO: make a textual list of all unique technologies
   return (
      <div className="col-12 mt-3">
         <h1 className="font-weight-light">{`${first_name} ${last_name}`}</h1>
         <p>
            {first_name} is a Las Vegas software developer who specializes
            in&nbsp;
            {technologies_text}.&nbsp;{bio}
         </p>
      </div>
   )
}
