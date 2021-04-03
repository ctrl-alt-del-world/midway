import React from 'react'

import { RenderModules } from 'src/utils/renderModules'
import { SEO } from 'src/components/SEO'

export interface CollectionProps {
  pageContext: {
    modules: []
    slug: string
    main: {
      title: string
    },
    meta: {}
    site: {}
    title: string
  }
  path?: string
  preview?: boolean
}

const Collection = ({
  path,
  pageContext,
  preview = false
}: CollectionProps) => {
  const {
    modules,
    slug,
    title,
    site,
    meta
  } = pageContext

  const url = slug === 'home' ? '' : path
  return (
    <div className='mt1 x ac'>
      {preview && (
        <div className='bcblue ac cw x p1'>This is a Preview</div>
      )}
      <SEO defaultMeta={site.defaultMeta} defaultTitle={`${title} Collection - Midway`} metaInfo={meta} pagePath={url} />
      <div className='container--1000 mt2 pt6--800 mxa x al'>
        {RenderModules(modules)}
      </div>
    </div>
  )
}

export default Collection