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
  path: string
}

const Page = ({
  path,
  pageContext
}: PageProps) => {
  const {
    main: {
      modules,
      slug
    },
    meta
  } = pageContext

  const url = slug.current === 'home' ? '' : path
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