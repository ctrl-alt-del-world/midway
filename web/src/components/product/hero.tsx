import React from 'react'

import BlockContent from "@sanity/block-content-to-react"

import { Serializer } from "src/utils/serializer"
import { Image } from 'src/components/image'
import { ProductForm } from './form'

export const ProductHero = ({ product, main: { title, productDescription, linkedSite, linkedSiteName, mainImage }}: {
  main: {
    title?: string
    subTitle?: string
    slug: {}
    productDescription?: []
    mainImage: {
      asset: {
        _id: string
      }
    }
    linkedSite: string
    linkedSiteName: string
    cerealImage: {}
  }
  product: {
    defaultPrice: string
    productId: number
  }
}) => {
  return (
    <div className='product__hero'>
      <div className='container--xl p1 outer mxa'>
        <div className='f fw jcb aic'>
          <div className='c50 x'>
            <Image className='x' imageId={mainImage.asset._id} alt={title} />
          </div>
          <div className='c50 container--s mxa'>
            <h1>{title}</h1>
            {productDescription && (<BlockContent blocks={productDescription} serializers={Serializer} />)}
            {linkedSite && linkedSiteName && (
              <div className='callout bcblue cw p1 my1'>
                Shop the real product on the <a href={linkedSite} className='cw underline' target='_blank'>{linkedSiteName}</a> Website.
              </div>
            )}
            <ProductForm {...product} showQuantity={true} />
          </div>
        </div>
      </div>
    </div>
  )
}