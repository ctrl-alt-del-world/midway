import React from 'react'

import { PageLink } from 'src/components/link'
import { Github } from 'src/components/svgs'

export const Header = () => {
  return (
    <div className="container--xl mxa p1 outer">
      <div className="f x jcb aic">
        <div>
          <PageLink to="/" className="mr1">Index</PageLink>
          <PageLink to="/learn">Learn</PageLink>
        </div>
        <a href="https://github.com/ctrl-alt-del-world/midway"><Github className="midway__logo" /></a>
      </div>
    </div>
  )
}