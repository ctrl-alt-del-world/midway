import React, { useEffect, useState, FormHTMLAttributes } from 'react'
import cookie from 'js-cookie'
import cx from 'classnames'

const passwords = [
  'spaghetti'
]

const browser = typeof window !== 'undefined' && window;

export const PasswordWrapper = ({ children }: {
  children: any
}) => {
  // Comment this out to turn the password back on!
  // const [password, setPassword] = useState(cookie.get('password'))
  const [password, setPassword] = useState('spaghetti')
  const [error, setError] = useState(false)
  const form = React.createRef() as React.RefObject<HTMLFormElement>

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.current) {
      const { elements } = form.current
      const found = passwords.filter(el =>  el === elements.password.value)

      if (found.length === 1) {
        cookie.set('password', 'true', { expires: 30 })
        location.reload()
      } else {
        setError(true)
      }
    }
  }
  if (password) {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        {browser && (
          <div className='ac ma password bcblue f fw jcc y x'>

            <div className='container--xl  password__access rel w50 f aic jcc bcb p1 ac x outer cw'>
              <div className='x'>

                <form className='x ac password__form mxa' onSubmit={(e) => handleSubmit(e)} ref={form}>
                  <div className='mt1 x rel'>
                    <label className='cw p1'>
                      <span className='mb1 inline-block'>Please enter the password (it's spaghetti)</span>
                      <input aria-label='password' onChange={() => setError(false)} className={cx('p1 x bcw cblue caps mb1 founders cw ls1 password__input ac', {
                        'error': error
                      })} type='password' name='password' placeholder='Enter Password' />
                    </label>
                    <button type='submit' aria-label='submit' className='p1 no-style cw button button--b bcw mt1'>
                      Submit
                    </button>
                  </div>
                  <p>This is a mock password page</p>
                  <br />
                  {error && (<span className='small inline-block pt1 m05'>We're sorry that's not a correct password.</span>)}
                </form>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}