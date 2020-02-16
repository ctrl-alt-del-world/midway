import React from 'react'

import { Header } from "src/components/header"

import "src/styles/main.css"

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default Layout