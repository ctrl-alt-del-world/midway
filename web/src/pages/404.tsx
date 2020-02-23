import React from 'react'

const browser = typeof window !== "undefined" && window

const NotFoundPage = () => {
  return (
    browser && (
      <div className='container--xl mxa ac'>
        Not Found
      </div>
    )
  )
}

export default NotFoundPage
