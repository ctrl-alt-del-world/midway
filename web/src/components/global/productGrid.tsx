import React from "react"
import { PageLink } from 'src/components/link'

export interface ProductGridProps {
  data: {
    title?: string
    shortDescription?: string
    products: Array<{
      _id: string
      content: {
        main: {
          title: string
          slug: {
            current: string
          }
        }
      }
    }>
  }
}

export const ProductGrid = ({ data }: ProductGridProps) => {
  const { title, products } = data
  return (
    <div className="container--xl outer mxa py2 al p1 p x">
      {console.log(products)}
      <h3 className='m0 p0'>{title}</h3>
      <div className='f fw mt1 jcb aic'>
        {products.map(({_id, content: {
          main
        }}) => (
          <div className='grid__product c30 x' key={_id}>
            <PageLink to={`/products/${main.slug.current}`}>{main.title}</PageLink>
          </div>
        ))}
        <div className='x c30' />
      </div>
    </div>
  )
}