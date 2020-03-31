import React from 'react'
import cx from 'classnames'

import { RenderModules } from 'src/utils/renderModules'
import { SEO } from "src/components/SEO"

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
  transitionStatus: string
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
    <div className={cx("animate__page mt1 ac", transitionStatus)}>
      <SEO metaInfo={meta} pagePath={url} />
      <div className="container--m mxa x al">
        {RenderModules(modules)}
      </div>
    </div>
  )
}

export default Page