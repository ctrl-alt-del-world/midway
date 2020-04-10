import React, { useCallback, useState } from "react"
import Helmet from "react-helmet"
import { useDeferredLoads } from "react-loads"
import fetch from "unfetch"
import { Link } from "gatsby"
// @ts-ignore
import { encode } from "shopify-gid"
import { navigate } from "@reach/router"
import Timeout from "await-timeout"
import cx from "classnames"

import { PasswordSchema } from 'src/utils/schema'

const Activate = (props: { id: string; token: string }) => {
  const [passwordField1, setPasswordField1] = useState("")
  const [passwordField2, setPasswordField2] = useState("")
  const [attempts, setAttempts] = useState(0)

  const verifyAccount = useCallback(
    async e => {
      setAttempts(attempts + 1)

      if (passwordField1 !== passwordField2) {
        await Timeout.set(400)
        throw new Error("Passwords do not match.")
      }

      if (!PasswordSchema.validate(passwordField1)) {
        throw new Error(
          "Your password should be between 8 and 100 characters, and have at least one lowercase and one uppercase letter."
        )
      }

      const body = {
        id: encode("Customer", props.id),
        input: {
          activationToken: props.token,
          password: passwordField1,
        },
      }

      const res = await fetch(`/.netlify/functions/activate`, {
        method: "POST",
        body: JSON.stringify(body),
      })

      try {
        const customer = await res.json()

        if (customer.error) {
          const err = new Error("Server Error: Account verification fetch response error.")

          throw err
        } else if (!res.ok) {
          const err = new Error("Server Error: Account verification fetch not OK.")

     
          throw err
        }

        await Timeout.set(400)
        await navigate("/account/login")
      } catch (err) {
        throw err
      }
      // hacky way to get it to run anew every time
      // and maybe in the future redirect them if they
      // need help.
    },
    [passwordField1, passwordField2, attempts]
  )

  const { error, load, isReloading, isPending } = useDeferredLoads(
    "verifyAccount",
    verifyAccount,
    {}
  )

  return (
    <div>
      <Helmet title="activate account" />
      <div className="nav-spacer" />
      <div className="accounts__wrapper f col aic jcc y px1">
        <div className="x">
          <div className="container--xl ma ac">
            <h5 className="pb0 caps sans ls">Activate Account</h5>
            <h2 className="my0">Almost there.</h2>
          </div>
          <div className="x container--s al mxa">
            {error && !isReloading && (
              <div className="studio mt1 error f col">
                <span>{error.message}</span>
              </div>
            )}

            {(isPending || isReloading) && (
              <div className="f jcc p1">
                <span>Loading</span>
              </div>
            )}

            <div
              className={cx(
                "x container--s col mya",
                isPending || isReloading ? "invisible" : "visible"
              )}
            >

              <div className="pb1  x pya">
                <div className="caps sans ls my1">Password</div>
                <input
                  className="py1 px1  x s16 s16"
                  type="password"
                  value={passwordField1}
                  onChange={e => setPasswordField1(e.target.value)}
                  placeholder="Password"
                />
              </div>
              
              <div className="pb1 mb1 x pya">
                <div className="caps sans ls mt1 py05">Confirm Password</div>
                <input
                  className="py1 px1 x mb1 s16"
                  type="password"
                  value={passwordField2}
                  onChange={e => setPasswordField2(e.target.value)}
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div className="ac x">
              
              <button
                type="submit"
                className="button button--wide cg ac akz ls-s mt1 inline-block caps s14"
                onClick={load}
              >
                Activate
              </button>

              <div className="container--m mya pt1 aic">
                <p className=" sans s14  pt1 ac">
                  Already have an account?{" "}
                  <Link className="underline active" to="/account/login">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activate
