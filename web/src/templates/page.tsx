import React from 'react'
import cx from 'classnames'

const Page = ({
  pageContext,
  transitionStatus
}: {
  pageContext: {}
  transitionStatus: string
}) => {
  return (
    <div className={cx("animate__page mt1 ac", transitionStatus)}>
      <div className="container--m mxa x al">
        Sanity Created this page
      </div>
    </div>
  )
}

export default Page