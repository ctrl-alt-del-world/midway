import React, { useState, useEffect } from 'react'

import { useCartTotals, useCartItems } from 'src/context/siteContext'

import {
  LineItem
} from 'src/components/cart/lineItem'

export const Cart = () => {
  const lineItems = useCartItems()
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
        <div className='tc p3'>
          Cart is Empty
        </div>
      )}
    </div>
  )
}