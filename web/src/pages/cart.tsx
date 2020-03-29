import React from 'react'
import cx from 'classnames'

import { Cart } from 'src/components/cart'

const CartPage = ({ transitionStatus }: { transitionStatus: string }) => {
  return (
    <div className={cx("animate__page mt1 ac", transitionStatus)}>
      <div className="container--m mxa x al">
        <Cart />
      </div>
    </div>
  )
}

export default CartPage
