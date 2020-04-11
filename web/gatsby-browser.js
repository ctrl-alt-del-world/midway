/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

  
import React from "react"
import { StoreContextProvider } from "src/context/siteContext"
import * as Sentry from '@sentry/browser'

export const shouldUpdateScroll = ({
	routerProps: { location },
	getSavedScrollPosition
}) => {
	if (location.action === "PUSH") {
		window.setTimeout(() => window.scrollTo(0, 0), 600);
	} else {
		const savedPosition = getSavedScrollPosition(location);
		window.setTimeout(() => window.scrollTo(...(savedPosition || [0, 0])), 600);
	}
	return false;
};

// Optional Config Sentry
Sentry.init({dsn: process.env.GATSBY_SENTRY_DSN});

export const wrapRootElement = ({ element }) => (
  <StoreContextProvider>{element}</StoreContextProvider>
)