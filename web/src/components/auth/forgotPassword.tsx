import React, { useState, useCallback } from "react"
import Helmet from "react-helmet"
import fetch from "unfetch"
import { Link } from "gatsby"
import { useLoads } from 'react-loads'

import { ErrorHandling } from 'src/utils/error'

export const ForgotPassword = ({ path }: { path: string }) => {
  const [formSuccess, setFormSuccess] = useState(false)
  const form = React.createRef() as React.RefObject<HTMLFormElement>

  const handleForgot = useCallback(
    (email) =>
      fetch(`/.netlify/functions/forgot-password`, {
        method: "POST",
        body: JSON.stringify({
          email
        }),
      })
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            throw new Error(res.error)
          } else {
            setFormSuccess(true)
          }
        }),
    []
  )

  const { error, isRejected, isPending, isReloading, load } = useLoads(
    "handleForgot",
    handleForgot as any,
    {
      defer: true,
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form) {
      const { email } = form!.current!.elements
      load(email.value)
    }
  }

  return (
    <div>
      <Helmet title="forgot password" />
      <div className="nav-spacer" />
      <div className="accounts__wrapper cg f jcc px1 outer aic">
        <form className="f col jcc x aic y" onSubmit={e => handleSubmit(e)} ref={form}>
          <div className="container--xl mya ac">
            <div className="m1"/>
            <h2 className="my0">Forgot your password?</h2>
          </div>

          {isRejected && <ErrorHandling error={error.message} />}

          {formSuccess && (
            <div className="small studio mt1">
              Got it! Email coming your way now.
            </div>
          )}

          <div className="x container--s col aic jcc">
            <div className="pb1 mb1 pya">
              <label htmlFor='email' className="caps sans ls my05">Email</label>
              <input id='email' name="email" type="text" required={true} className="accounts__input py1 px1 x s16 mb1" placeholder="Enter Email" />
            </div>
            <div className="x mxa ac">
              <button type="submit" className="button button--wide cg ac akz ls-s mt1 inline-block caps s14 my1">
                {(isPending ||
                  isReloading) ? (
                  <span>Loading</span>
                ): (
                  <span>Request Reset</span>
                )}
              </button>
            </div>
          </div>

          <p className="mya pt1 s14">
            Remember your password?{" "}
            <Link className="underline active" to="/account/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
