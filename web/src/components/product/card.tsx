import React, { useState, useEffect } from 'react'
import { encode, decode } from 'shopify-gid'

import { PageLink } from 'src/components/link'
import { Image } from 'src/components/image'
import { ProductForm } from './form'

import { client, useAddItemToCart } from 'src/context/siteContext'

export const ProductCard = ({
  _id,
  content: {
    main,
    shopify
  }
}: Product ) => {
  return (
    <div className='grid__product c30 x' key={_id}>
      <PageLink className='block' to={`/products/${main.slug.current}`}>
        {main.mainImage && (<Image className='block x' imageId={main.mainImage.asset._ref} alt={main.title} />)}
        <div className='f jcb aic'>
          <span>{main.title}</span>
          <span>${shopify.defaultPrice}</span>
        </div>
      </PageLink>
      <div className='x mt05'>
        <ProductForm {...shopify} showQuantity={false} waitlist={false} addText={'Quick Add'} />
      </div>
    </div>
  )
}

export interface Product {
  _id: string
  content: {
    main: {
      title: string
      mainImage: {
        asset: {
          _ref: string
        }
      }
      slug: {
        current: string
      }
    }
    shopify: {
      defaultPrice: string
      productId: number
    }
  }
}