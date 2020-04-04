import React from 'react'
import { navigate } from 'gatsby'
import cookie from 'js-cookie'
import fetch from 'unfetch'

import { setCustomerInState, useStore } from 'src/context/siteContext'
import { Orders } from 'src/components/auth/orders'

export const Portal = () => {
  const updateCustomerInState = setCustomerInState()
  const { customerToken } = useStore()
  const logout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const customerToken = cookie.get('customer_token')
    fetch(`/.netlify/functions/logout`, {
      method: 'POST',
      body: JSON.stringify({
        accessToken: customerToken
      })
    })
    .then(() => {
      cookie.remove('customer_token')
      cookie.remove('customer_email')
      cookie.remove('customer_firstName')
      setTimeout(() => {
        updateCustomerInState()
      }, 300)
      setTimeout(() => {
        navigate('/')
      }, 500)
    })
  }
  return (
    <div className='container--l mxa p1 ac'>
      <h1>Account Portal</h1>
      <a href="#logout" onClick={e => logout(e)}>Logout</a>
      <div className='x al mt1'>
        {customerToken && (
          <Orders />
        )}
      </div>
    </div>
  )
}
