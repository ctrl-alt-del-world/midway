import React from 'react'
import shallow from 'zustand/shallow'

import { PageLink } from 'src/components/link'
import { Disclaimer } from 'src/components/disclaimer'

// import { useCartCount, useToggleCart, useStore } from 'src/context/siteContext'

import useStore from '../stores/useStore'

export const Header = () => {
  // const {customerName} = useStore()
  // const count = useCartCount()
  // const toggleCart = useToggleCart()
  const {toggleCart, cartCount, customerName} = useStore(store => ({
    toggleCart: store.toggleCart,
		cartCount: store.cartCount,
    customerName: store.customerName
  }), shallow)

  return (
    <div className='x pf z10 top left bg--off-white '>
      <Disclaimer />
      <div className='df x jcb aic bb pl3--800 pr3--800 outer p1'>
        <div>
          <PageLink to='/' className='mr2'>Index</PageLink>
          <PageLink to='/documentation' className='mr2'>Docs</PageLink>
          <PageLink to='/collections/all'>Shop All</PageLink>
        </div>
        <div>
          <a href='/account' className=''>{customerName ? `Hi, ${customerName}` : 'Account'}</a>
          <button aria-label='cart' className='p0 dib p1 ml2 s1' onClick={toggleCart}>
            Cart (<span className=''>{cartCount}</span>)
          </button>
        </div>
      </div>
    </div>
  )
}
