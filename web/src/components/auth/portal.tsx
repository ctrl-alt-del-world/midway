import React from 'react'
import { Link, navigate } from 'gatsby'
import cookie from 'js-cookie'
import fetch from 'unfetch'

export const Portal = () => {
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
      // this should remove the email from the cart
      // checkout.hydrate()
      setTimeout(() => {
        navigate('/')
      })
    })
  }
  return (
    <div className='container--l mxa p1 ac'>
      Logged in!
      <a href="#logout" onClick={e => logout(e)}>Logout</a>
    </div>
  )
}
