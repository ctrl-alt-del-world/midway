import React from 'react'

import { Github } from 'src/components/svgs'
import { Newsletter } from 'src/components/newsletter'

export const Footer = () => {
  return (
    <div className='bg--off-white pt4 pb4 mt5'>
      <div className='container--xl footer mxa x p1 mt3 mt6--800 outer'>
        <div className='row jcb x'>
          <div className='col c10'>
            <div className='container--600 footer__newsletter'>
              <h5 className='small mb05 caps'>Newsletter Signup</h5>
              <p className='mt0 mb1 p0 small'>Fake newsletter, but talks to real Klaviyo test instance</p>
              <Newsletter />
            </div>
          </div>
          <div className='col c2  tr'>
            <a className='dib footer__colophon' href='https://github.com/ctrl-alt-del-world/midway'><Github className='x' /></a>
          </div>
        </div>
      </div>
    </div>
  )
}