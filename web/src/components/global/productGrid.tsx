import React from "react"
import { PageLink } from 'src/components/link'

import { Image } from 'src/components/image'

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
          main,
          shopify: {
            defaultPrice
          }
        }}) => (
          <div className='grid__product c30 x' key={_id}>
            <PageLink to={`/products/${main.slug.current}`}>
              <Image className='x' imageId={main.mainImage.asset._ref} alt={main.title} />
              <div className='f jcb aic'>
                <span>{main.title}</span>
                <span>${defaultPrice}</span>
              </div>
            </PageLink>
          </div>
        ))}
        <div className='x c30' />
      </div>
    </div>
  )
}