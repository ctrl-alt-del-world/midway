import React from "react"
import Helmet from "react-helmet"

export const InvalidToken = ({path}: {path:string}) => {
  return <div>
      <Helmet title="login" />
      <div className="nav-spacer" />
      <h1 className="ac">Error: Invalid Activation Token.</h1>
  </div>
}