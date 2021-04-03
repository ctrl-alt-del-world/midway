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

const ProductGrid = ({ data }: ProductGridProps) => {
  const { title, products } = data
  return (
    <div className="container--xl outer mxa pt2 pb2 al p1 p x">
      <h3 className='mt0 p0 mb2'>{title}</h3>
      <div className='row'>
        {products && products.map((singleProduct) => (
          <ProductCard key={singleProduct._id} {...singleProduct} />
        ))}
        <div className='x c30' />
      </div>
    </div>
  )
}

export default ProductGrid