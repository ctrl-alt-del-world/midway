import React from 'react'

import { RenderModules } from 'src/utils/renderModules'

export interface DocumentationProps {
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
  path?: string
  preview?: boolean
}

const Documentation = ({
  path,
  pageContext,
  preview = false
}: DocumentationProps) => {
  const {
    main: {
      modules
    },
    meta
  } = pageContext

  return (
    <div className='mt1 x ac'>
      <div className='container--m mxa x al'>
        {RenderModules(modules)}
      </div>
    </div>
  )
}

export default Documentation