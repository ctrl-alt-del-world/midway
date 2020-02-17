import { navigate } from 'gatsby'
import cookie from 'js-cookie'
import React, { useEffect, useState } from "react"

interface Props {
  component: React.ElementType
  path: string
}

const AuthWrapper = (props: Props) => {
  const { component: Component, path, ...rest } = props
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!cookie.get('customer_token') || !cookie.get('customer_email')) navigate('/account/login')
    setReady(true)
  }, [0]);

  return (
    <div>
      {ready ? <Component path={path} {...rest} /> : <span />}
    </div>
  )
}

export default AuthWrapper
