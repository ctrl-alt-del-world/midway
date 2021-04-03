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
        <div className='row df aic'>
          <div className='col c12 c6--800 x'>
            <Image className='x' imageId={mainImage?.asset._id} alt={title} />
          </div>
          <div className='col c12 c6--800'>
            <div className='p4--800'>
              <h1 className='mb2'>{title}</h1>
              {productDescription && (<BlockContent blocks={productDescription} serializers={Serializer} />)}
              {linkedSite && linkedSiteName && (
                <div className='callout bg--blue color--white p1 my1'>
                  Shop the real product on the <a href={linkedSite} className='cw underline' target='_blank'>{linkedSiteName}</a> Website.
                </div>
              )}
              <ProductForm {...product} showQuantity={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
