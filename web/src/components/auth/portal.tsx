import React from 'react'
import { Link, navigate } from 'gatsby'
import cookie from 'js-cookie'
import fetch from 'unfetch'

import { setCustomerInState } from 'src/context/siteContext'

export const Portal = () => {
  const updateCustomerInState = setCustomerInState()
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
      Logged in!
      <a href="#logout" onClick={e => logout(e)}>Logout</a>
    </div>
  )
}
