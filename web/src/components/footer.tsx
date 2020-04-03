import React from 'react'

import { Github } from 'src/components/svgs'

export const Footer = () => {
  return (
    <div className='container--xl mxa x p1 outer'>
      <div className='f x jcb ais'>
        <div>
          Newsletter Module
        </div>
        <a href='https://github.com/ctrl-alt-del-world/midway'><Github className='midway__logo' /></a>
      </div>
    </div>
  )
}