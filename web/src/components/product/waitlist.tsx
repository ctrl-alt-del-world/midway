import React, { useState } from 'react'
import { decode } from 'shopify-gid'

export const Waitlist = ({ accountId, message, buttonText, variantId }: {
  accountId: string
  message: string
  buttonText: string
  variantId: string
}) => {
  const [success, setSuccess] = useState(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget
    const { email } = form.elements
    const productIdDecoded = decode(variantId).id
    fetch('/.netlify/functions/back-in-stock', {
      method: 'POST',
      body: JSON.stringify({
        accountId,
        email: email.value,
        variant: productIdDecoded,
        platform: 'shopify'
      })
    })
    .then(() => {
      setSuccess(true)
    })
    
  }
  return (
    <React.Fragment>
    {!success ? (
      <form onSubmit={e => handleSubmit(e)} className='x f jcb aist'>
        <input name='email' className='x p05' placeholder='Email' type='email' required={true} />
        <button type='submit' className='x y cg p15 button button--w p1 cblue ac'>
          <span className='caps small ls-s'>{buttonText}</span>
        </button>
      </form>
    ): (
      <div>
        <p>{message}</p>
      </div>
    )}
  </React.Fragment>
  )
}