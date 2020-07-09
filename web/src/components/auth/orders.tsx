import React, { useEffect, useCallback, useState } from 'react'
import cookie from 'js-cookie'
import { useLoads } from 'react-loads'
import spacetime from 'spacetime'

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
            console.log(res)
            if (res.customer.orders.edges) {
              setOrders(res.customer.orders.edges)
            }
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
    if (token) {
      load(token)
    }
  }, [])

  return (
    <div className='container--m mxa x'>
      <h2 className='mb0 pb0'>Orders</h2>
      <div className='x al mya'>
        {(isPending ||
          isReloading) && (
          <span>Loading</span>
        )}

        {isRejected && (
          <div className='mt1 error'>
            <span role='img' aria-label='error'>
              ⚠️
            </span>
            : {error.message}
          </div>
        )}

        {orders.length > 0 ? (
          <div>
            <div className='x accounts__orders-wrapper'>
              {orders.map(order => (
                <div key={order.node.orderNumber} className='x bct py1 f jcb aic'>
                  <div className='al'>
                    <h3 className='m0 p0'>{order.node.orderNumber}</h3>
                    <span>Processed: {spacetime(order.node.processedAt).unixFmt('dd.MM.yyyy')}</span>
                  </div>
                  <div className='ar'>
                    <h5 className='m0 p0'>${order.node.totalPrice}</h5>
                    <a href={order.node.statusUrl} target='_blank' rel='noopener noreferrer'>Order Status</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p>Sorry you don't have any orders yet!</p>
          </div>
        )}
      </div>
    </div>
  )
}