import React from 'react'

import { PageLink } from 'src/components/link'

import { useCartCount, useToggleCart, useStore } from 'src/context/siteContext'

export const Header = () => {
  const {customerName} = useStore()
  const count = useCartCount()
  const toggleCart = useToggleCart()

  return (
    <div className='container--xl mxa p1 outer'>
      <div className='f x jcb aic'>
        <div>
          <PageLink to='/' className='mr1'>Index</PageLink>
          <PageLink to='/documentation' className='mr1'>Docs</PageLink>
          <PageLink to='/collection/all'>Shop All</PageLink>
        </div>
        <div>
          <a href='/account' className='mr1'>{customerName ? `Hi, ${customerName}` : 'Account'}</a>
          <button aria-label='cart' className='p0 no-style a mr1 s1' onClick={() => toggleCart()}>
            Cart (<span className='s1'>{count}</span>)
          </button>
        </div>
      </div>
    </div>
  )
}