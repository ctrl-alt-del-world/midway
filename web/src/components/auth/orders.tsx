import React, { useEffect, useCallback, useState } from 'react'
import cookie from 'js-cookie'
import { useLoads } from 'react-loads'

import { useStore } from 'src/context/siteContext'

export const Orders = () => {
  const {customerToken} = useStore()
  const [orders, setOrders] = useState([])
  const handleOrders = useCallback(
    (token) =>
      fetch(`/.netlify/functions/orders`, {
        method: 'POST',
        body: JSON.stringify({
          token
        }),
      })
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            throw new Error(res.error.message)
          } else {
            setOrders(res.customer.orders)
            return null
          }
        }),
    []
  )

  const { error, isRejected, isPending, isReloading, load } = useLoads(
    'handleOrders',
    handleOrders as any,
    {
      defer: true,
    }
  )

  useEffect(() => {
    const token = customerToken || cookie.get('customer_token')
    load(token)
  }, [])

  return (
    <div>
      <h2 className='mb0 pb0'>Orders</h2>
      {orders.length > 0 ? (
        <div>
          ORDERS
        </div>
      ) : (
        <div>
          <p>Sorry you don't have any orders yet!</p>
        </div>
      )}
    </div>
  )
}