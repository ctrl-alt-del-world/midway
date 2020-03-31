import React from "react"

import { ProductCard } from 'src/components/product/card'

export interface ProductGridProps {
  data: {
    title?: string
    shortDescription?: string
    products: Array<{
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
    }>
  }
}

export const ProductGrid = ({ data }: ProductGridProps) => {
  const { title, products } = data
  return (
    <div className="container--xl outer mxa py2 al p1 p x">
      <h3 className='m0 p0'>{title}</h3>
      <div className='f fw mt1 jcb aic'>
        {products.map((singleProduct) => (
          <ProductCard key={singleProduct._id} {...singleProduct} />
        ))}
        <div className='x c30' />
      </div>
    </div>
  )
}