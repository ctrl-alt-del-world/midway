import React, { useState, useCallback } from 'react'
import Helmet from 'react-helmet'
import fetch from 'unfetch'
import { Link, navigate } from 'gatsby'
import { useLoads } from 'react-loads'
import Timeout from 'await-timeout'

import { ErrorHandling } from 'src/utils/error'

import { UpdateCustomer } from 'src/utils/updateCustomer'
import { PasswordSchema } from 'src/utils/schema'

export const Register = ({path}: {path: string}) => {
  const [passwordField1, setPasswordField1] = useState("")
  const [passwordField2, setPasswordField2] = useState("")
  const form = React.createRef() as React.RefObject<HTMLFormElement>
  const [attempts, setAttempts] = useState(0)

  const handleRegister = useCallback(
    async (email, password, firstName, lastName) => {
      setAttempts(attempts + 1)

      if (!PasswordSchema.validate(passwordField1)) {
        throw new Error(
          "Your password should be between 8 and 100 characters, and have at least one lowercase and one uppercase letter."
        )
      }

      if (passwordField1 !== passwordField2) {
        await Timeout.set(400)
        throw new Error("Passwords do not match.")
      }
      const res = await fetch(`/.netlify/functions/register`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName
        })
      })
      try {
        const customer = await res.json()

        if (customer.error) {

          throw new Error(customer.error)
        } else {
            UpdateCustomer(customer, email)
            // re-hydrate the cart so it contains the email
            // checkout.hydrate()
            setTimeout(() => {
              navigate('/')
            }, 400)
          }
        } catch (err) {
          throw err
        }
      },
    [passwordField1, passwordField2, attempts]
  )
  const { error, isRejected, isPending, isReloading, load } = useLoads(
    'handleRegister',
    handleRegister as any,
    {
      defer: true
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { email, password, firstName, lastName } = form!.current!.elements
    load(email.value, password.value, firstName.value, lastName.value)
  }
  return (
    <div>
      <Helmet title='create account' />
      <div className='accounts__wrapper f col aic jcc y outer px1'>
        <form className='f col jcc aic y' onSubmit={e => handleSubmit(e)} ref={form}>
          <div className='container--xl mya ac'>
            <h5 className='pb0 caps sans ls'>Sign Up</h5>
          </div>

          {(isPending ||
            isReloading) && (
            <span>Loading</span>
          )}

          {isRejected && <ErrorHandling error={error.message} />}

          <div className='x container--s col'>
            <div className='pya pb1'>
              <div className='caps sans s14 ls mt1'>First Name</div>
              <input name='firstName' type='text' required={true} className='accounts__input s16 mb0 x px1 py1' placeholder='First Name' />
            </div>
            <div className='pya pb1'>
              <div className='caps sans s14 ls mt1'>Last Name</div>
              <input name='lastName' type='text' required={true} className='accounts__input s16 mb0 x px1 py1' placeholder='Last Name' />
            </div>
            <div className='pya pb1'>
              <div className='caps sans s14 ls mt1'>Email</div>
              <input name='email' type='text' required={true} className='accounts__input s16 mb0 x px1 py1' placeholder='Enter Email' />
            </div>
            <div className='pya pb1'>
              <div className='caps sans s14 ls mt1 mb0 pb0'>Password</div>
              <p className='mini mt0'>(Must be at least 8 characters long and include a both a lowercase and uppercase letter).</p>
              <input name='password' value={passwordField1} onChange={e => setPasswordField1(e.target.value)} type='password' required={true} className='accounts__input s16 mb0 x px1 py1' placeholder='Password' />
            </div>
            <div className='pya pb1'>
              <div className='caps sans s14 ls mt1'>Confirm Password</div>
              <input name='passwordConfirm' value={passwordField2} onChange={e => setPasswordField2(e.target.value)}  type='password' required={true} className='accounts__input s16 mb1 x px1 py1' placeholder='Verify Password' />
            </div>
          </div>

          <div className='container--m ac mya mt1'>
            <button type='submit' className='button button--full button--lg cg ac akz ls-s my1 inline-block caps s14'>
              {(isPending ||
                isReloading) ? (
                <span>Loading</span>
              ): (
                <span>Submit</span>
              )}
            </button>
            <p className='py1 s14'>
              Already have an account?{' '}
              <Link className='underline active' to='/account/login'>
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
