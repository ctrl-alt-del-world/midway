import React, { useState } from "react"
import Helmet from "react-helmet"
import fetch from "unfetch"
import { Link } from "gatsby"

const ForgotPassword = () => {
  const [error, setError] = useState(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const form = React.createRef()
  const handleSubmit = e => {
    e.preventDefault()
    const { email } = form.current.elements
    fetch(`/.netlify/functions/forgotPassword`, {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
        }
        setFormSuccess(true)
      })
  }
  return (
    <div>
      <Helmet title="forgot password" />
      <div className="nav-spacer" />
      <div className="accounts__wrapper cg f jcc px1 outer aic">
        <form
          className="f col jcc x aic y"
          onSubmit={e => handleSubmit(e)}
          ref={form}
        >
          <div className="container--xl mya ac">
            <div className="m1"/>
            <h2 className="my0">Forgot your password?</h2>
          </div>

          {error && (
            <div className="small studio mt1 error">
              <span role="img" aria-label="error">
                ⚠️
              </span>
              : {error}
            </div>
          )}

          {formSuccess && (
            <div className="small studio mt1">
              Got it! Email coming your way now.
            </div>
          )}

          <div className="x container--s col aic jcc">
            <div className="pb1 mb1 pya">
              <div className="caps sans ls my05">Email</div>
              <input
                name="email"
                type="text"
                required
                className="accounts__input py1 x s16 mb1"
                placeholder="Enter Email"
              />
            </div>
            <div className="x mxa ac">
              <button
                type="submit"
                className="button button--wide cg ac akz ls-s mt1 inline-block caps s14 my1"
              >
                Request Reset
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

export default ForgotPassword
