import React, { useEffect } from 'react'
import cx from 'classnames'

import { RenderModules } from 'src/utils/renderModules'

import { ProductHero } from 'src/components/product/hero'

import { useSetPage } from 'src/context/siteContext'
import { SEO } from 'src/components/SEO'

export interface ProductProps {
  pageContext: {
    main: {
      modules: [],
      slug: {
        current: string
      },
      colorAssociation?: string
      title: string
    },
    meta: {}
    shopify: {}
  }
  transitionStatus: string
}

const Product = ({
  pageContext,
  transitionStatus
}: ProductProps) => {
  const setPage = useSetPage()
  const { main } = pageContext
  const {
    main: {
      modules,
      slug,
      colorAssociation
    },
    meta,
    shopify
  } = pageContext
  useEffect(() => {
    setPage(pageContext.main.slug.current)
  }, [0])

  const url = `products/${slug.current}`
  return (
    <div className={cx("animate__page ac", transitionStatus)}>
      <SEO metaInfo={meta} pagePath={url} />
      <div className={cx('mxa x al site__main', pageContext.main.slug.current, colorAssociation)}>
        <ProductHero main={pageContext.main} product={shopify} />
        {RenderModules(modules)}
      </div>
    </div>
  )
}

export default Product