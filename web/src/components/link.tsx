import React from 'react'
import { Link } from 'gatsby'

export const PageLink = (props: {
  className?: string
  to: string
  type?: string
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onMouseOver?: () => void
  children?: any
}) => (
  <Link
    type={props.type}
    className={props.className}
    activeClassName='active'
    onClick={props.onClick}
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
    onMouseOver={props.onMouseOver}
    to={props.to}>
    {props.children}
  </Link>
)
