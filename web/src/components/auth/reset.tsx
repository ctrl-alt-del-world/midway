import React, { useState, useCallback } from 'react'
import Helmet from 'react-helmet'
import fetch from 'unfetch'
import { encode } from 'shopify-gid'
import { useLoads } from 'react-loads'
import { Link, navigate } from 'gatsby'

import { UpdateCustomer } from "../../utils/updateCustomer"

export const Reset = (props: {
  id?: string
  token?: string
}) => {
  const [submit, setSubmitting] = useState(false)
  const [formSuccess, setFormSucces] = useState(null)
  const form = React.createRef() as React.RefObject<HTMLFormElement>

  const handleReset = useCallback(
    (password) => 
      fetch(`/.netlify/functions/resetPassword`, {
        method: 'POST',
        body: JSON.stringify({
          id: encode('Customer', props.id),
          input: {
            resetToken: props.token,
            password
          }
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            throw new Error(res.error)
            setSubmitting(false)
          } else {
            setFormSucces(true)
            UpdateCustomer(res, res.customer.email)
            // re-hydrate the cart so it contains the email
            // checkout.hydrate()
            setTimeout(() => {
              navigate('/')
            }, 400)
          }
        }),
    []
  )

  const { error, isRejected, isPending, isReloading, load } = useLoads(
    "handleReset",
    handleReset as any,
    {
      defer: true,
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const { password } = form.current.elements
    load(password.value)
  }
  return (
    <div>
      <Helmet title='reset' />
      <div className="nav-spacer" />
      <div className="accounts__wrapper f col jcc outer aic y px1">
        <div className='container--xl ac x ma p1'>
          <form className='f col jcc aic y' onSubmit={e => handleSubmit(e)} ref={form}>
            <div className="container--xl mya ac">
              <h5 className="pb0 caps sans ls">Reset Your Password</h5>
              <h2 className="mt025">Let's get you logged back in.</h2>
            </div>
            <div className="container--s al mxa x">
              {error && (
                <div className='small mt1 error'>Something went wrong: {error},<br />please request a new <Link to='/account/forgot'>password reset</Link></div>
              )}
              {formSuccess && (
                <div className='small mt1'>Got it! Email coming your way now.</div>
              )}
              <div className="pb1  x pya">
                <div className="caps sans ls mt1">Password</div>
                <input name='password' type='password' required className='accounts__input  py1 s16 x' placeholder='Password' />
              </div>
              <div className="pb1  x pya">
                <div className="caps sans ls py05 mt1">Confirm Password</div>
                <input name='password2' type='password' required className='accounts__input mb1 py1 s16 x' placeholder='Confirm Password' />
              </div>
              <div className="ac x mt1">
                <button type='submit' className='button button--wide cg ac akz ls-s mt1 inline-block caps s14'>{submit ? 'Resetting' : 'Reset Password'}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
