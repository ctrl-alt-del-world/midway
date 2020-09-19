import React, { useEffect } from 'react'
import cx from 'classnames'

import { RenderModules } from 'src/utils/renderModules'

import { ProductHero } from 'src/components/product/hero'
import { ProductSchema } from 'src/components/product/schema'

import { useSetPage } from 'src/context/siteContext'
import { SEO } from 'src/components/SEO'

export interface ProductProps {
  pageContext: {
    main: {
      modules: [],
      slug: {
        current: string
      },
      title: string
    },
    meta: {}
    shopify: {}
  }
  preview?: boolean
}

const Product = ({
  pageContext,
  preview = false
}: ProductProps) => {
  const setPage = useSetPage()
  const { main } = pageContext
  const {
    main: {
      modules,
      slug
    },
    meta,
    shopify
  } = pageContext
  useEffect(() => {
    setPage(pageContext.main.slug.current)
  }, [0])

  const url = `products/${slug.current}`
  return (
    <div className='ac x'>
      {preview && (
        <div className='bcblue ac cw x p1'>This is a Preview</div>
      )}
      <div dangerouslySetInnerHTML={{
          __html: `
            <script type="application/ld+json">
              ${JSON.stringify(ProductSchema(main, shopify))}
            </script>
          `
        }} />
      <SEO metaInfo={meta} pagePath={url} />
      <div className={cx('mxa x al site__main', pageContext.main.slug.current)}>
        <ProductHero main={pageContext.main} product={shopify} />
        {RenderModules(modules)}
      </div>
    </div>
  )
}

export default Product