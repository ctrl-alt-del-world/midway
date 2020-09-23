import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import tighpo from 'tighpo'

import { Header } from 'src/components/header'
import { Footer } from 'src/components/footer'
import { SwitchTransition, Transition } from 'react-transition-group'
import { Disclaimer } from 'src/components/disclaimer'
import { CartDrawer } from 'src/components/cartDrawer'
import { PasswordWrapper } from './password'


const TRANSITION_DURATION = 400;
const TRANSITION_STYLES = {
	default: {
		transition: `opacity ${TRANSITION_DURATION}ms ease-in-out`,
	},
	entering: {
		opacity: 0,
	},
	entered: {
		opacity: 1,
	},
	exiting: {
		opacity: 0,
	},
	exited: {
		opacity: 0,
	},
};

import 'src/styles/vendor.css'
import 'src/styles/main.css'

const Layout = ({ children, siteMetadata, location, pageContext }: { children: any }) => {

  // Render documentation for CMS minus header/footer experience
  if (pageContext.layout === 'docs') {
    return (
      <div>
        {children}
      </div>
    )
  }

  if (pageContext.layout === 'accounts') {
    return (
      <React.Fragment>
        <Helmet title='Accounts' />
        <Disclaimer />
        <Header />
        <div>{children}</div>
        <Footer />
      </React.Fragment>
    )
  }

  useEffect(() => {
    tighpo('spaghetti', function () {
      const style = document.createElement('style')
      document.body.appendChild(style)
      style.sheet.insertRule('html, body { cursor: url(https://spaghet.now.sh), auto !important; }')
    })
  }, [0])

  return (
    <React.Fragment>
      <Helmet title='Midway'>
        <link href='https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap' rel='stylesheet' />
      </Helmet>
      <PasswordWrapper>
        <div>
          <Disclaimer />
          <Header />
          <CartDrawer />
          {/* 
          
            Smooth transition credits to Ian Williams: https://github.com/dictions
          
          */}
          {!/account/.test(location.pathname) ? (
            <SwitchTransition>
              <Transition
                key={location.pathname}
                mountOnEnter={true}
                unmountOnExit={true}
                appear={true}
                timeout={TRANSITION_DURATION}>
                  {status => (
                    <div
                      style={{
                        ...TRANSITION_STYLES.default,
                        ...TRANSITION_STYLES[status],
                      }}>
                      {children}
                      <Footer />
                    </div>
                  )}
              </Transition>
            </SwitchTransition>
          ) : (
            <div>
              {children}
              <Footer />
            </div>
          )}
        </div>
      </PasswordWrapper>
    </React.Fragment>
  )
}

export default Layout