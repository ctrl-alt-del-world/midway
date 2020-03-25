import React from 'react'
import Helmet from 'react-helmet'

import { Header } from "src/components/header"
import { Disclaimer } from "src/components/disclaimer"
import { PasswordWrapper } from './password'

import "src/styles/main.css"

const Layout = ({ children, siteMetadata }: { children: any }) => {
  return (
    <React.Fragment>
      <Helmet>
        <link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet" />
      </Helmet>
      <PasswordWrapper>
        <div>
          <Disclaimer />
          <Header />
          {children}
        </div>
      </PasswordWrapper>
    </React.Fragment>
  )
}

export default Layout