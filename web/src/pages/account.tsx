import React, { useEffect } from 'react'
import { Router } from '@reach/router'

import AuthWrapper from 'src/components/auth/authWrapper'
// @ts-ignore
import Login from 'src/components/auth/login.js'
// @ts-ignore
import Register from 'src/components/auth/register.js'
// @ts-ignore
import Forgot from 'src/components/auth/forgotPassword.js'
// @ts-ignore
import Reset from 'src/components/auth/reset.js'
// @ts-ignore
import Activate from 'src/components/auth/activate'
import { InvalidToken } from '../components/auth/invalid_token'
import { Portal } from '../components/auth/portal'

const Account = ({
  transitionStatus,
  pageContext,
}: {
  transitionStatus: string
  pageContext: {
    menus: []
    footer: {}
  }
}) => {
  const {
    menus,
    footer,
  }: {
    menus: []
    footer: {}
  } = pageContext

  return (
    <div id='account__container' className='accounts__wrapper'>
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
          <Forgot path='/forgot' />
        </PublicRoute>
      </Router>
    </div>
  )
}

function PublicRoute(props: { children: React.ReactNode; path: string }) {
  return <div>{props.children}</div>
}

export default Account
