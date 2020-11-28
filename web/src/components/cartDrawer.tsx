import React from 'react'
import { Link } from 'gatsby'
import cx from 'classnames'

import { Cart } from 'src/components/cart'
import { useStore, useToggleCart, useCartTotals, useCartItems, useCheckout } from 'src/context/siteContext'

import {
  Close
} from 'src/components/svgs'

/*
/    Cart Drawer: This module is a bit more robust then other parts of the theme,
/    this is because carts are relatively difficult to execute, scale to mobile etc,
/    feel free to keep more of this styling if you use this component, the structure 
/    a bit confusing to make sure all elements are visible/scrollable on mobile
*/

export const CartDrawer = () => {
  const lineItems = useCartItems()
  const { cartIsOpen } = useStore()
  const { total } = useCartTotals()
  const toggleCart = useToggleCart()
  const openCheckout = useCheckout()
  const trap = cartIsOpen ? (
    <React.Fragment>
      <div className='cart__drawer-inner'>
        <div className='ac rel cart__drawer-header df aic jcc'>
          <button type='reset' className='pa button--none bg--transparent cart__drawer-close close left cb' onClick={() => toggleCart()}>
            <Close className='db m1' />
          </button>
          <h4 className='s26 medium'>Cart</h4>
        </div>
        <div className='bg--off-white cart__drawer-shipping df jcc aic tc'>
          <div className='x ac'>
            <div className='cart__drawer-progress x pr'>
              <span className='block pa bg--black left y' style={{ 'width': `${((parseFloat(total)).toFixed(2) / 40) * 100}%` }} />
            </div>
            {lineItems.length > 0 && (
              <>
                {parseInt(total, 0) <= 40 ? (
                  <div className='s12 p1'>You're <span className=''>${(40 - (parseFloat(total))).toFixed(2)}</span> away from free shipping!</div>
                ) : (
                  <div className='s12 p1'>Your order qualifies for <span className='bold'>Free Shipping!</span></div>
                )}
              </>
            )}
          </div>
        </div>
        <Cart />
      </div>
      <div className={cx('bg--white cart__drawer-buttons', parseInt(total, 0) >= 40 && 'free', lineItems.length >= 1 && 'visible')}>
        <div className='f fw bcw  left ac cart__drawer-bottom pa bottom x jcc aic rel x'>
          <div className='x p2 jcb'>
            {lineItems.length > 0 && (
              <div className='py1 cart__drawer-sub medium'>
                <div className='x df jcb aic py18 px1 bcw'>
                  <span className='s18'>Subtotal</span>
                  <span className='s18 mono'>${total}</span>
                </div>
              </div>
            )}
          </div>
          {lineItems.length < 1 ? (
              <Link className='button button--lg p3 bold s16 dib tc color--white bg--black medium x'  onClick={() => toggleCart()} to='/'>Continue Shopping</Link>
          ): (
            <button onClick={openCheckout} type='submit' className='button bn bt p2 medium bg--black color--black s16 x'>
              <span className='color--white'>Checkout</span>
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  ) : (
    false
  )
  return (
    <>
      <div
        className={cx('cart__drawer bg--white aist z10 right top x pf', cartIsOpen && 'is-open')}
        id='container'
      >
      {trap}
      </div>
      {/* Handles the overlay to click-close the cart */}
      <div onClick={() => toggleCart()} className={cx('cart__drawer-bg bg--white z9 left top x y pf', cartIsOpen && 'is-open')} />
    </>
  )
}