import React, { useState } from 'react'
import { subscribe } from 'klaviyo-subscribe'

export const Newsletter = ({
  listId = 'EMPTY', // UPDATEME: important for handling newsletters in klaviyo 
  customFields = {},
  buttonText = 'Subscribe',
  message = `We've recieved your information!`
}: {
  listId?: string
  customFields?: {}
  buttonText?: string
  message?: string
}) => {
  const [success, setSuccess] = useState(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget
    const { email } = form.elements
    subscribe(listId, email.value, customFields)
    .then(() => {
      form.reset()
      setSuccess(true)
    })
  }
  return (
    <React.Fragment>
      {!success ? (
        <form onSubmit={e => handleSubmit(e)} className='x df jcb aist'>
          <input name='email' className='x p05' placeholder='Email' type='email' required={true} />
          <button type='submit' className='x y cg p15 button button--w p1 cblue ac'>
            <span className='sm12 ls-s'>{buttonText}</span>
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
