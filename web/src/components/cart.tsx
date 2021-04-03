import React, { useState, useEffect } from 'react'
import shallow from 'zustand/shallow'
// import { useCartTotals, useCartItems } from 'src/context/siteContext'

import useStore, { toggleCart } from '../stores/useStore'

import {
  LineItem
} from 'src/components/cart/lineItem'

export const Cart = () => {
  // const lineItems = useCartItems()
  // const { total } = useCartTotals()
  const {cart} = useStore(store => ({
    cart: store.cart
  }), shallow)
  return (
    <div>
      {cart && cart.lineItems.length > 0 ? (
        <div className='bcw p1'>
          {cart && cart.lineItems.map((item: { id: string, quantity: number }) => (
            <React.Fragment key={item.id + item.quantity}>
              <LineItem {...item} />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className='tc p3'>
          Cart is Empty
        </div>
      )}
    </div>
  )
}