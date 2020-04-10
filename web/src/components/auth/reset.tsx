import React, { useState, useCallback } from 'react'
import Helmet from 'react-helmet'
import fetch from 'unfetch'
import { encode } from 'shopify-gid'
import { useLoads } from 'react-loads'
import { navigate } from 'gatsby'
import Timeout from 'await-timeout'

import { ErrorHandling } from 'src/utils/error'
import { PasswordSchema } from 'src/utils/schema'
import { UpdateCustomer } from "src/utils/updateCustomer"

export const Reset = (props: {
  path: string
  id?: string
  token?: string
}) => {
  const [passwordField1, setPasswordField1] = useState("")
  const [passwordField2, setPasswordField2] = useState("")
  const [submit, setSubmitting] = useState(false)
  const [formSuccess, setFormSucces] = useState(false)
  const form = React.createRef() as React.RefObject<HTMLFormElement>

  const handleReset = useCallback(
    async (password) =>  {

      if (!PasswordSchema.validate(passwordField1)) {
        throw new Error(
          "Your password should be between 8 and 100 characters, and have at least one lowercase and one uppercase letter."
        )
      }

      if (passwordField1 !== passwordField2) {
        await Timeout.set(400)
        throw new Error("Passwords do not match.")
      }
        fetch(`/.netlify/functions/reset-password`, {
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
              // UpdateCustomer(res, res.customer.email)
              // re-hydrate the cart so it contains the email
              // checkout.hydrate()
              setTimeout(() => {
                navigate('/account/login')
              }, 400)
            }
          })
        },
    [passwordField1, passwordField2]
  )

  const { error, isRejected, isPending, isReloading, load } = useLoads(
    "handleReset",
    handleReset as any,
    {
      defer: true
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const { password } = form!.current!.elements
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
            {(isPending ||
              isReloading) && (
              <span>Loading</span>
            )}

            {isRejected && <ErrorHandling error={error.message} />}

            <div className="container--s al mxa x">
              {formSuccess && (
                <div className='small mt1'>Got it! Email coming your way now.</div>
              )}
              <div className="pb1  x pya">
                <div className="caps sans ls mt1">Password</div>
                <input name='password' type='password'  value={passwordField1} onChange={e => setPasswordField1(e.target.value)} required={true} className='accounts__input px1 py1 s16 x' placeholder='Password' />
              </div>
              <div className="pb1  x pya">
                <div className="caps sans ls py05 mt1">Confirm Password</div>
                <input name='passwordConfirm' type='password' value={passwordField2} onChange={e => setPasswordField2(e.target.value)}  required={true} className='accounts__input mb1 px1 py1 s16 x' placeholder='Confirm Password' />
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
