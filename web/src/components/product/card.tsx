import React, { useState, useEffect } from 'react'

import { PageLink } from 'src/components/link'
import { Image } from 'src/components/image'
import { ProductInt } from 'src/components/interfaces/product'
import { ProductForm } from './form'

import { client, useAddItemToCart } from 'src/context/siteContext'

export const ProductCard = ({
  _id,
  content: {
    main,
    shopify
  }
}: ProductInt ) => {
  return (
    <div className='col c12 mb1 c6--600 c3--800 product__card' key={_id}>
      <PageLink className='block' to={`/products/${main.slug.current}`}>
        {main.mainImage && (<Image className='db x' imageId={main.mainImage.asset._ref} alt={main.title} />)}
        <div className='df jcb mt1 grid__product-title aic'>
          <span>{main.title}</span>
          <span>${shopify.defaultPrice}</span>
        </div>
      </PageLink>
      <div className='x mt1'>
        <ProductForm {...shopify} showQuantity={false} waitlist={false} addText={'Quick Add'} />
      </div>
    </div>
  )
}
