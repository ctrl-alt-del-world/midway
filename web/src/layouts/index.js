import React from 'react'
import { Picostate } from '@picostate/react'
import Helmet from 'react-helmet'

import { Header } from "src/components/header"

import store from "src/state/store.ts"

import "src/styles/main.css"

const Layout = ({ children }) => {
  return (
    <Picostate store={store}>
      <div>
        <Helmet>
          <link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet" />
        </Helmet>
        <Header />
        {children}
      </div>
    </Picostate>
  )
}

export default Layout