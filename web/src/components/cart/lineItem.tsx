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

  return (
    <>
      <div className='x df pr mt1 line__item-single row gutter--none'>
        <div className='line__item-image col c5'>
          <img className='x db' src={itemImage} alt={title} />
        </div>
        <div className='col c11 df jcb fdc'>
          <div className='df jcb y fdc pl1'>
            <span className='s15  m0 p0'>{title}</span>
            <div className='row'>
              <div className='col c6'>
                <div className='df aic jcb line__item-qty'>
                  <button aria-label='decrease quantity' className='block rel qty__control button--none bg--transparent f jcc aic pr cursor aic' onClick={() => stateQuantity === 1 ? null : updateQuantity(stateQuantity - 1)}><Minus /></button>
                  <span name='quantity' min='1' className=' tc card-qty'>{stateQuantity}</span>
                  <button aria-label='increase quantity' className='qty__control button--none bg--transparent s1 block f jcc aic pr cursor rel jcc aic' onClick={() => updateQuantity(stateQuantity + 1)}><Plus /></button>
                </div>
              </div>
              <div className='col c2' />
              <div className='col c8 tl '>
                <div className='right line__item-price s15'>
                  {compareAtPrice && (
                    <span className='strikethrough'>
                      ${parseFloat(compareAtPrice) * stateQuantity}
                    </span>
                  )}
                  <span className='s15'>
                    ${parseFloat(price) * stateQuantity}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button type='reset' className='p05 pa button--none bg--transparent close right top cb' onClick={() => removeFromCart(id)}>
            <Close className='block' />
          </button>
        </div>
      </div>
    </>
  )
}