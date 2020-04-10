import React from 'react'

export const ErrorHandling = ({error}: {error: string}) => {
  return (
    <div className="studio mt1 error">
      <span role="img" aria-label="error">
        ⚠️
      </span>
      : {error}
    </div>
  )
}
