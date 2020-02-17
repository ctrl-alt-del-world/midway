import React, { useCallback, useEffect } from "react"
import fetch from "unfetch"
import { Link, navigate } from "gatsby"
import Helmet from "react-helmet"
import { useLoads } from "react-loads"
import cx from "classnames"

import { UpdateCustomer } from "../../utils/updateCustomer"

export const Login = ({ path }: { path: string }) => {
  const form = React.createRef() as React.RefObject<HTMLFormElement>

  const handleLogin = useCallback(
    (email, password) =>
      fetch(`/.netlify/functions/accounts`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            throw new Error(res.error)
          } else {
            UpdateCustomer(res, email)
            // re-hydrate the cart so it contains the email
            // checkout.hydrate()
            setTimeout(() => {
              navigate("/account")
            }, 400)
            return null
          }
        }),
    []
  )

  const { error, isRejected, isPending, isReloading, load } = useLoads(
    "handleLogin",
    handleLogin as any,
    {
      defer: true,
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { email, password } = form.current.elements

    load(email.value, password.value)
  }

  return (
    <div>
      <Helmet title="login" />
      <div className="nav-spacer" />
      <div className="accounts__wrapper f col jcc aic y px1 outer">
        <form
          className={cx("f col jcc x aic y")}
          onSubmit={e => handleSubmit(e)}
          ref={form}
        >
          <div className="container--xl mya ac">
            <h5 className="pb0 caps sans ls">Log In</h5>
          </div>

          <div className="x container--s al mya">
            {(isPending ||
              isReloading) && (
              <span>Loading</span>
            )}

            {isRejected && (
              <div className="studio mt1 error">
                <span role="img" aria-label="error">
                  ⚠️
                </span>
                : {error.message}
              </div>
            )}
            <div className="pb1 pya">
              <div className="caps sans s14 ls my05">Email</div>
              <input name="email" type="text" required className="accounts__input py1 s16 x" placeholder="Enter Email" />
            </div>
            <div className="mb1 pb1 pya">
              <div className="caps sans s14 ls mt01 py05">Password</div>
              <input name="password" type="password" required className="accounts__input py1 mb1 s16 x" placeholder="Enter Password" />
            </div>
            <div className="caps sans ls my1"/>
            <div className="x mxa ac">
              <button type="submit" className="button button--wide button--lg cg ac akz ls-s mt1 inline-block caps s14">
                Log in
              </button>
            </div>
          </div>

          <div className="container-m mya aic">
            <p className="ac pt1">
              <Link className="s14 underline active" to="/account/forgot">
                Forgot password?
              </Link>
            </p>
            <p className="ac py1 s14">
              Don't have an account?{" "}
              <Link className="underline active" to="/account/register">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
