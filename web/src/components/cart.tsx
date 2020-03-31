import React, { useState, useEffect } from 'react'

import { PageLink } from 'src/components/link'
import { useCartTotals, useCartItems, useCheckout, useToggleCart } from 'src/context/siteContext'

import {
  LineItem
} from 'src/components/cart/lineItem'

export const Cart = () => {
  const lineItems = useCartItems()
  const openCheckout = useCheckout()
  const toggleCart = useToggleCart()
  const { total } = useCartTotals()
  return (
    <div>
      {lineItems.length > 0 ? (
        <div className='bcw p1'>
          {lineItems.map((item: { id: string, quantity: number }) => (
            <React.Fragment key={item.id + item.quantity}>
              <LineItem {...item} />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className='ac'>
          Cart is Empty
        </div>
      )}
      <div className='bcw p1'>
        <div className='x jcb p05'>
          <h5 className='ac x caps'>Shipping is Free</h5>
          {lineItems.length > 0 && (
            <div className='x f jcb aic'>
              <span className='s24'>Subtotal</span>
              <span className='s24'>{total}</span>
            </div>
          )}
        </div>
        {lineItems.length < 1 ? (
          <div className='f jcc aic rel x'>
            <PageLink className='s24 m05'  onClick={() => toggleCart()} to='/'>Let's Go Shooooping</PageLink>
          </div>
        ): (
          <button onClick={() => openCheckout()} type='submit' className='button bcblue cw button--h-black x bcb p1'>
            <span className='s24 block p1'>Checkout</span>
          </button>
        )}
      </div>
    </div>
  )
}