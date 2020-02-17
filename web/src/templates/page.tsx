import React from 'react'
import cx from 'classnames'

import { RenderModules } from 'src/utils/renderModules'

export interface PageProps {
  pageContext: {
    main: {
      modules: [],
      slug: {},
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
  return (
    <div className={cx("animate__page mt1 ac", transitionStatus)}>
      <div className="container--m mxa x al">
        {RenderModules(modules)}
      </div>
    </div>
  )
}

export default Page