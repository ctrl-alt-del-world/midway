import React, { useState, useCallback } from 'react'
import Helmet from 'react-helmet'
import fetch from 'unfetch'
import { Link, navigate } from 'gatsby'
import { useDeferredLoads } from 'react-loads'
import PasswordValidator from 'password-validator'
import Timeout from 'await-timeout'

import { UpdateCustomer } from '../../utils/updateCustomer'

export const Register = ({path}: {path: string}) => {
  const [passwordField1, setPasswordField1] = useState("")
  const [passwordField2, setPasswordField2] = useState("")
  const form = React.createRef() as React.RefObject<HTMLFormElement>
  const [attempts, setAttempts] = useState(0)

  const schema = new PasswordValidator()

  schema
    .is()
    .min(8)
    .is()
    .max(100)
    .has()
    .lowercase()
    .has()
    .uppercase()

  const handleRegister = useCallback(
    async (email, password, firstName, lastName) => {
      setAttempts(attempts + 1)

      if (!schema.validate(passwordField1)) {
        throw new Error(
          "Your password should be between 8 and 100 characters, and have at least one lowercase and one uppercase letter."
        )
      }

      if (passwordField1 !== passwordField2) {
        await Timeout.set(400)
        throw new Error("Passwords do not match.")
      }

        // fetch(`/.netlify/functions/register`, {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     email,
        //     password,
        //     firstName,
        //     lastName
        //   }),
        // })
        //   .then(res => res.json())
        //   .then(res => {
        //     if (res.error) {
        //       console.group('hey>', res)
        //       throw new Error(res.error)
        //     } else {
        //       console.log('sup fam 1', res)
        //       UpdateCustomer(res, email)
        //       // re-hydrate the cart so it contains the email
        //       // checkout.hydrate()
        //       setTimeout(() => {
        //         navigate('/')
        //       }, 400)
        //     }
        //   })
        },
    []
  )
  const { error, isRejected, isPending, isReloading, load } = useDeferredLoads(
    'handleRegister',
    handleRegister as any
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { email, password, firstName, lastName } = form.current.elements
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

          {error && !isReloading && (
            <div className='small studio mt1 error mxa'>
              <div>{error.message}</div>
            </div>
          )}

          <div className='x container--s col'>
            <div className='pya pb1'>
              <div className='caps sans s14 ls mt1'>First Name</div>
              <input name='firstName' type='text' required={true} className='accounts__input s16 mb0 x py1' placeholder='First Name' />
            </div>
            <div className='pya pb1'>
              <div className='caps sans s14 ls mt1'>Last Name</div>
              <input name='lastName' type='text' required={true} className='accounts__input s16 mb0 x py1' placeholder='Last Name' />
            </div>
            <div className='pya pb1'>
              <div className='caps sans s14 ls mt1'>Email</div>
              <input name='email' type='text' required={true} className='accounts__input s16 mb0 x py1' placeholder='Enter Email' />
            </div>
            <div className='pya pb1'>
              <div className='caps sans s14 ls mt1 mb0 pb0'>Password</div>
              <p className='mini mt0'>(Must be at least 8 characters long and include a both a lowercase and uppercase letter).</p>
              <input name='password' value={passwordField1} onChange={e => setPasswordField1(e.target.value)} type='password' required={true} className='accounts__input s16 mb0 x py1' placeholder='Password' />
            </div>
            <div className='pya pb1'>
              <div className='caps sans s14 ls mt1'>Confirm Password</div>
              <input name='passwordConfirm' value={passwordField2} onChange={e => setPasswordField2(e.target.value)}  type='password' required={true} className='accounts__input s16 mb1 x py1' placeholder='Verify Password' />
            </div>
          </div>

          <div className='container--m mya mt1'>
            <button type='submit' className='button button--full button--lg cg ac akz ls-s my1 inline-block caps s14'>
              Submit
            </button>
            <p className='py1 s14'>
              Already have an account?{' '}
              <Link className='underline active' to='/account/login'>
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
