import React from 'react'
import cx from 'classnames'

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
  return (
    <div className='product__hero'>
      <div className='container--xl p1 outer mxa'>
        {title}
      </div>
    </div>
  )
}