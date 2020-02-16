import React from 'react'

import { PageLink } from "src/components/link"

export const Header = () => {
  return (
    <div className="container--xl mxa p1 outer">
      <div className="f x jcb aic">
        <div>
          <PageLink to="/" className="mr1">Index</PageLink>
          <PageLink to="/learn">Learn</PageLink>
        </div>
      </div>
    </div>
  )
}