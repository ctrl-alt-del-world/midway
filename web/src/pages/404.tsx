import React from 'react'

const browser = typeof window !== "undefined" && window

const NotFoundPage = () => {
  return (
    browser && (
      <div className='x'>
        Not Found
      </div>
    )
  )
}

export default NotFoundPage
