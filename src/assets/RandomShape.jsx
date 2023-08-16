import React from 'react'

const RandomShape = () => {
  return(
      <svg
      className='random-shape'
      // width="200" height="200" 
      xmlns="http://www.w3.org/2000/svg">
        <path className='random-shape-path' d="M50 20 Q0 20 0 60 Q0 100 50 100 Q100 100 100 60 Q100 20 50 20"
        fill="#f8eace" />
      </svg>
  )
}

export default RandomShape