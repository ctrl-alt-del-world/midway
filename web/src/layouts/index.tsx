import React from 'react'
import Helmet from 'react-helmet'

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

import 'src/styles/main.css'

const Layout = ({ children, siteMetadata, location }: { children: any }) => {
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
          <SwitchTransition>
            <Transition
              key={location.pathname}
              mountOnEnter
              unmountOnExit
              appear
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
        </div>
      </PasswordWrapper>
    </React.Fragment>
  )
}

export default Layout