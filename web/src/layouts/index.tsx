import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import tighpo from 'tighpo'

import { Header } from 'src/components/header'
import { Footer } from 'src/components/footer'
import { SwitchTransition, Transition } from 'react-transition-group'
import { CartDrawer } from 'src/components/cartDrawer'
import { PasswordWrapper } from './password'

import Analytics from 'src/components/analytics'


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

import 'src/styles/main.scss'

const Layout = ({ children, location, pageContext }: { children: any, location: { pathname: string }, pageContext: { site?: {}, layout: string }}) => {

  const { site } = pageContext

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
        <Header />
        <div>{children}</div>
        <Footer {...site} />
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
      <Analytics
        googleAnalyticsPropertyId={process.env.GATSBY_GA_ID} />
      <PasswordWrapper>
        <div>
          <a
            name='maincontent'
            className='pf top left z10 skip'
            href='#maincontent'
          >
            Skip to main content
          </a>
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
                    <main
                      className='site'
                      id='maincontent'
                      style={{
                        ...TRANSITION_STYLES.default,
                        ...TRANSITION_STYLES[status],
                      }}>
                      {children}
                      <Footer {...site} />
                    </main>
                  )}
              </Transition>
            </SwitchTransition>
          ) : (
            <div>
              {children}
              <Footer {...site} />
            </div>
          )}
        </div>
      </PasswordWrapper>
    </React.Fragment>
  )
}

export default Layout