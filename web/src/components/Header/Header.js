import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import './Header.scss'


const Header = props => {
	// run graphql queries, setState, useContext, etc.
	return <>
	  <header >
	    <h1>Edit pages/index.js</h1>
	  </header>
	</>
}

export default Header
