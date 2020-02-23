import React from 'react'
import Helmet from 'react-helmet'

import { Header } from "src/components/header"

import "src/styles/main.css"

const Layout = ({ children }) => {
  return (
    <div>
      <Helmet>
        <link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet" />
      </Helmet>
      <Header />
      {children}
    </div>
  )
}

export default Layout