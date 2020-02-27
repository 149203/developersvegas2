import React from 'react'

export default function Developer_Bio(props) {
   console.log(props)
   const { first_name, last_name, _id, bio, unique_technologies } = props
   const technologies_text = 'HTML, CSS' // TODO: make a textual list of all unique technologies
   return (
      <div className="col-12 mt-4 mb-6">
         <h1 className="font-weight-light">{`${first_name} ${last_name}`}</h1>
         <p>
            {first_name} is a Las Vegas software developer who specializes
            in&nbsp;
            {unique_technologies
               .filter(technology => technology.is_active)
               .map((technology, i, arr) => {
                  return (
                     <span key={technology._id}>
                        {technology.name}
                        {i === arr.length - 2 ? ', and ' : ''}
                        {i < arr.length - 2 ? ', ' : ''}
                        {i === arr.length - 1 ? '. ' : ''}
                     </span>
                  )
               })}
            {bio}
         </p>
      </div>
   )
}
