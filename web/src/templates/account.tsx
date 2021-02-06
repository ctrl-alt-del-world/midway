import React, { useEffect } from 'react'
import { Router } from '@reach/router'

import AuthWrapper from 'src/components/auth/authWrapper'
// @ts-ignore
import Activate from 'src/components/auth/activate'

import { ForgotPassword } from 'src/components/auth/forgotPassword'
import { Register } from 'src/components/auth/register'
import { Login } from 'src/components/auth/login'
import { Reset } from 'src/components/auth/reset'
import { InvalidToken } from 'src/components/auth/invalid_token'
import { Portal } from 'src/components/auth/portal'

const Account = ({
  pageContext
}: {
  pageContext: {}
}) => {
  return (
    <div id='account__container' className='container--1000 mxa outer p2 site'>
      <Router>
        <PublicRoute path='/account'>
          <AuthWrapper path='/' component={Portal} />
          <Reset path='/reset/:id/:token' />
          <Login path='/login' />
          <Activate
            // @ts-ignore
            path='/activate/:id/:token'
          />
          <InvalidToken path='/invalid_token' />
          <Register path='/register' />
          <ForgotPassword path='/forgot' />
        </PublicRoute>
      </Router>
    </div>
  )
}

function PublicRoute(props: { children: React.ReactNode; path: string }) {
  return <div>{props.children}</div>
}

export default Account
