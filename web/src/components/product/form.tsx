import React, { useEffect, useState } from 'react'
import { encode, decode } from 'shopify-gid'
import cx from 'classnames'

import { Waitlist } from 'src/components/product/waitlist'
import { client, useAddItemToCart } from 'src/context/siteContext'

export const ProductForm = ({ slug, defaultPrice, productId, showQuantity, waitlist = true, addText }: {
  defaultPrice: string
  slug?: {
    current: string
  }
  productId: number
  waitlist?: boolean | true
  showQuantity?: boolean | true
  addText?: string
}) => {
  const addItemToCart = useAddItemToCart()

  const [quantity, setQuantity] = useState(1 as number)
  const [adding, setAdding] = useState(false as boolean)
  const [price, setPrice] = useState(defaultPrice)
  const [availableForPurchase, setAvailable] = useState(false)
  const [variants, setVariants] = useState([])
  const [activeVariantId, setActiveVariantId] = useState('' as string)
  const [compareAtPrice, setCompareAtPrice] = useState(undefined as string | undefined)
  const [check, setCheck] = useState(true)

  const [gift, setGift] = useState({
    giftEmail: '',
    giftMessage: ''
  })

  const form = React.createRef()

  useEffect(() => {
    if (check) {
      const shopifyId = encode("Product", productId, {
        accessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN,
      })

      client.product.fetch(shopifyId).then((product: any) => {
        const decodedVariants = [] as any
        product.variants.forEach((variant: any) => {
          decodedVariants.push({
            ...variant,
            cleanId: parseInt(decode(variant.id).id, 0),
          })
        })

        setVariants(decodedVariants)
        setActiveVariantId(decodedVariants[0].id as string)
        setAvailable(decodedVariants[0].available)

        if (decodedVariants[0].compareAtPrice) setCompareAtPrice(decodedVariants[0].compareAtPrice)

        setCheck(false)
      })
    }
  }, [check])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setAdding(true)
    const attributes = []
    if (availableForPurchase) {
      addItemToCart(activeVariantId, quantity, attributes).then(() => {
        setAdding(false)
      })
    }
  }

  const handleChange = (e: React.FormEvent) => {
    setActiveVariantId(e.target.value)
    variants.forEach(variant => {
      if (variant.id === e.target.value) {
        if (variant.compareAtPrice) {
          setCompareAtPrice(variant.compareAtPrice)
        }
        setPrice(variant.price)
      }
    })
  }

  const handleGiftChange = e => {
    setGift({ ...gift, [e.target.name]: e.target.value });
  }

  return (
    <div className='container--m'>
      {availableForPurchase && !check ? (
        <form onSubmit={(e) => handleSubmit(e)} ref={form}>
          <div className='x'>
            {variants.length > 1 && (
              <div className='x'>
                <select onChange={handleChange} className='x p1'>
                  {variants.map(({ id, title, available }: {id: string, title: string, available: boolean}) => (
                    <option disabled={!available} key={id} value={id}>{title}</option>
                  ))}
                </select>
              </div>
            )}

            <div className='product__form df jcs aist'>
              {showQuantity && (
                <div className='product__form-qty bl bb f jcb aic'>
                  <div className='df jcc p1 aic product__form-qty-wrapper mxa'>
                    <button type='button' className='block rel mr05 qty__control bg--transparent bn s24 = cursor p05 aic' onClick={() => quantity === 1 ? null : setQuantity(quantity - 1)}>-</button>
                    <input type='number' value={quantity} onChange={e => setQuantity(parseInt(e.currentTarget.value, 10))} name='quantity' min='1' className='color--black card-qty bn tc' />
                    <button type='button' className='qty__control bg--transparent bn s1 block  s24 cursor rel p05 jcc aic' onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                </div>
              )}
              <button type='submit' className={cx('p1 x ba color--black bg--black s20 button', {
                'bnt': variants.length > 1
              })}>
                <span className='color--white'>{adding ? 'Adding' : addText ? addText : 'Add to Cart'}</span>
                {compareAtPrice && (
                  <span className='bold s20 ml1 color--white strikethrough'>${parseFloat(compareAtPrice * quantity)}</span>
                )}
                <span className='color--white ml1'>
                  ${parseFloat(price * quantity)}
                </span>
              </button>
            </div>
          </div>
        </form>
      ): (
        <div>
          {availableForPurchase ? (
            <span>Checking Stock</span>
          ): 
            waitlist ? (
              <div className='mt1 pt1'>
                <h5>Get notifed when stock is replenished</h5>
                <Waitlist
                  accountId='KKfBYU'
                  message="Got it! We'll update you when it's back"
                  buttonText='Notify Me'
                  variantId={activeVariantId} />
              </div>
            ) : (
              // Left empty for now
              <div className='ac x bold'>
                <span className='small' />
              </div>
            )
          }
        </div>
      )}
    </div>
  )
}