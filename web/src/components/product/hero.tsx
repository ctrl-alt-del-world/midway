import React from 'react'

import BlockContent from "@sanity/block-content-to-react"

import { Serializer } from "src/utils/serializer"
import { Image } from 'src/components/image'
import { ProductForm } from './form'

export const ProductHero = ({ product, main: { title, subTitle, productDescription, slug, mainImage, cerealImage }}: {
  main: {
    title?: string
    subTitle?: string
    slug: {}
    productDescription?: []
    mainImage: {}
    cerealImage: {}
  }
  product: {
    defaultPrice: string
    productId: number
  }
}) => {
  console.group(productDescription)
  return (
    <div className='product__hero'>
      <div className='container--xl p1 outer mxa'>
        <div className='f fw jcb aic'>
          <div className='c50 x'>
            <Image className='x' imageId={mainImage.asset._id} alt={title} />
          </div>
          <div className='c50 container--s mxa'>
            <h1>{title}</h1>
            <BlockContent blocks={productDescription} serializers={Serializer} />
            <ProductForm {...product} />
          </div>
        </div>
      </div>
    </div>
  )
}