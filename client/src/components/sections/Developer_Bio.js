import React from 'react'

export default function Developer_Bio(props) {
   const { first_name, last_name, _id, bio, unique_technologies } = props
   return (
      <div className="mt-4 mb-6 mb-md-8">
         <div className="col-12">
            <h1>{`${first_name} ${last_name}`}</h1>
         </div>
         <div className="col-12">
            <p className="mb-0">
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
      </div>
   )
}
