import React from 'react'
import TransitionLink from 'gatsby-plugin-transition-link'

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
  <TransitionLink
    entry={{ delay: 0.2 }}
    exit={{ length: 1 }}
    type={props.type}
    className={props.className}
    activeClassName='active'
    onClick={props.onClick}
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
    onMouseOver={props.onMouseOver}
    to={props.to}>
    {props.children}
  </TransitionLink>
)
