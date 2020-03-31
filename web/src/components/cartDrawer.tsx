import React from 'react'
import cx from 'classnames'

import { Cart } from 'src/components/cart'
import { useStore, useToggleCart} from 'src/context/siteContext'

import {
  Close
} from 'src/components/svgs'

export const CartDrawer = () => {
  const { cartIsOpen } = useStore()
  const toggleCart = useToggleCart()
  const trap = cartIsOpen ? (
    <div className='cart__drawer-inner'>
      <div className='ac rel cart__drawer-header'>
        <h4>Your Cart</h4>
        <button type='reset' className='p05 abs no-style cart__drawer-close close right top cb' onClick={() => toggleCart()}>
          <Close className='block' />
        </button>
      </div>
      <Cart />
    </div>
  ) : (
    false
  )
  return (
    <div
      className={cx('cart__drawer bcw z10 right top x abs', cartIsOpen && 'is-open')}
      id='container'
    >
      {trap}
    </div>
  )
}