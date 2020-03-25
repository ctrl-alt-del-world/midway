import React from 'react'
import Helmet from 'react-helmet'

import { Header } from "src/components/header"
import { Disclaimer } from "src/components/disclaimer"

import "src/styles/main.css"

const Layout = ({ children }: { children: any }) => {
  return (
    <div>
      <Helmet>
        <link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet" />
      </Helmet>
      <Disclaimer />
      <Header />
      {children}
    </div>
  )
}

export default Layout