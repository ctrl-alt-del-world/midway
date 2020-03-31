import React from 'react'

import { PageLink } from 'src/components/link'
import { Image } from 'src/components/image'

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
    }
  }
}

export const ProductCard = ({
  _id,
  content: {
    main,
    shopify: {
      defaultPrice
    }
  }
}: Product ) => {
  return (
    <div className='grid__product c30 x' key={_id}>
      <PageLink to={`/products/${main.slug.current}`}>
        <Image className='x' imageId={main.mainImage.asset._ref} alt={main.title} />
        <div className='f jcb aic'>
          <span>{main.title}</span>
          <span>${defaultPrice}</span>
        </div>
      </PageLink>
    </div>
  )
}