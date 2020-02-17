import React, { useState } from 'react'
import Helmet from 'react-helmet'
import fetch from 'unfetch'
import cookie from 'js-cookie'
import { encode } from 'shopify-gid'
import { Link, navigate } from 'gatsby'

import store from 'src/state/store.ts'

const Reset = (props) => {
  const [error, setError] = useState(null)
  const [submit, setSubmitting] = useState(false)
  const [formSuccess, setFormSucces] = useState(null)
  const form = React.createRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    const { password } = form.current.elements
    fetch(`/.netlify/functions/resetPassword`, {
      method: 'POST',
      body: JSON.stringify({
        id: encode('Customer', props.id),
        input: {
          resetToken: props.token,
          password: password.value
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
          setSubmitting(false)
        } else {
          setFormSucces(true)
          cookie.set('customer_token', res.token, { expires: 25 })
          cookie.set('customer_email', res.customer.email, { expires: 25 })
          store.hydrate({ customerToken: res.token, email: res.customer.email, orders: res.customer.orders })
          // re-hydrate the cart so it contains the email
          // checkout.hydrate()
          setTimeout(() => {
            navigate('/')
          }, 400)
        }
      })
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
                <div className='small studio mt1 error'>Something went wrong: {error},<br />please request a new <Link to='/account/forgot'>password reset</Link></div>
              )}
              {formSuccess && (
                <div className='small studio mt1'>Got it! Email coming your way now.</div>
              )}
              <div className="pb1  x pya">
                <div className="caps sans ls mt1">Password</div>
                <input
                  name='password'
                  type='password'
                  required
                  className='accounts__input  py1 s16 x'
                  placeholder='Password' />
              </div>
              <div className="pb1  x pya">
                <div className="caps sans ls py05 mt1">Confirm Password</div>
                <input
                  name='password2'
                  type='password'
                  required
                  className='accounts__input mb1 py1 s16 x'
                  placeholder='Confirm Password' />
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

export default Reset
