import React, { useState, useEffect } from 'react'

import {
  Close,
  Minus,
  Plus
} from 'src/components/svgs'

import {
  useUpdateItemsFromCart,
  useRemoveItemFromCart,
  client
} from 'src/context/siteContext'

export const LineItem = ({ id, title, quantity, variant: { price, compareAtPrice, image }, customAttributes }: {
  id: string
  title: string
  quantity: number
  variant: {
    price: string
    image: string
    compareAtPrice: string
  }
  customAttributes: Array<{
    value: string
  }>
}) => {
  const updateItemsFromCart = useUpdateItemsFromCart()

  const [stateQuantity, setQuantity] = useState(quantity)
  const removeFromCart = useRemoveItemFromCart()

  const updateQuantity = (qty: number) => {
    updateItemsFromCart({id, quantity: qty})
    setQuantity(qty)
  }

  const itemImage = client.image.helpers.imageForSize(
    image,
    { maxWidth: 300, maxHeight: 300 }
  )
  console.log(itemImage)

  return (
    <div className='f x aic rel cart__single'>
      <div className='cart__single-image mr1'>
        <img className='x' src={itemImage} alt={title} />
      </div>
      <div>
        <span className='h4 ls1 caps m0 p0 offlimits'>{title}</span>
        <div className='f jcs aic product__form-qty-wrapper mt05 mxa'>
          <button className='block rel qty__control no-style s24 f jcc aic founders cursor py05 aic' onClick={() => stateQuantity === 1 ? null : updateQuantity(stateQuantity - 1)}><Minus /></button>
          <input type='number' value={stateQuantity} onChange={e => updateQuantity(parseInt(e.currentTarget.value, 10))} name='quantity' min='1' className='cb founders card-qty bn ac' />
          <button className='qty__control no-style s1 block f jcc aic founders s24 cursor rel py05 jcc aic' onClick={() => updateQuantity(stateQuantity + 1)}><Plus /></button>
          <div className='abs right cart__single-price s16 bottom p1'>
            {compareAtPrice && (
              <span className='strikethrough'>
                ${parseFloat(compareAtPrice) * stateQuantity} ({stateQuantity})
              </span>
            )}
            <span>
              ${parseFloat(price) * stateQuantity} ({stateQuantity})
            </span>
          </div>
        </div>
        <button type='reset' className='p05 abs no-style close right top cb' onClick={() => removeFromCart(id)}>
          <Close className='block' />
        </button>
      </div>
    </div>
  )
}