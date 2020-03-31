import React from 'react'

import { RenderModules } from 'src/utils/renderModules'
import { SEO } from 'src/components/SEO'

export interface PageProps {
  pageContext: {
    main: {
      modules: [],
      slug: {
        current: string
      },
      title: string
    },
    meta: {}
  }
}

const Page = ({
  pageContext,
  transitionStatus
}: PageProps) => {
  const {
    main: {
      modules,
      slug,
      title
    },
    meta
  } = pageContext
  const url = slug.current === 'home' ? '' : slug.current
  return (
    <div className='mt1 ac'>
      <SEO metaInfo={meta} pagePath={url} />
      <div className='container--m mxa x al'>
        {RenderModules(modules)}
      </div>
    </div>
  )
}

export default Page