import React from "react"

import { ProductCard } from 'src/components/product/card'
import { ProductInt } from 'src/interfaces/product'

export interface ProductGridProps {
  data: {
    title?: string
    shortDescription?: string
    products?: [ProductInt]
  }
}

export const ProductGrid = ({ data }: ProductGridProps) => {
  const { title, products } = data
  return (
    <div className="container--xl outer mxa py2 al p1 p x">
      <h3 className='m0 p0'>{title}</h3>
      <div className='f fw mt1 jcb ais'>
        {products && products.map((singleProduct) => (
          <ProductCard key={singleProduct._id} {...singleProduct} />
        ))}
        <div className='x c30' />
      </div>
    </div>
  )
}