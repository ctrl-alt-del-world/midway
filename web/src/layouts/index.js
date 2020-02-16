import React from 'react'
import { Picostate } from '@picostate/react'

import { Header } from "src/components/header"

import store from "src/state/store.ts"

import "src/styles/main.css"

const Layout = ({ children }) => {
  return (
    <Picostate store={store}>
      <div>
        <Header />
        {children}
      </div>
    </Picostate>
  )
}

export default Layout