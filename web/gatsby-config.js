require("dotenv").config()
const path = require('path')
const proxy = require('http-proxy-middleware')

module.exports = {
  // Handles local dev for the netlify functions
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:34567',
        pathRewrite: {
          '/.netlify/functions/': ''
        }
      })
    )
  },
  siteMetadata: {
    title: `Midway`,
    description: `Gatsby + Sanity + Shopify Repo`,
    siteUrl: `https://midway.ctrlaltdel.world`,
    author: `iamkevingreen`,
    password: true
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: 'https://midway.ctrlaltdel.world',
        sitemap: 'https://midway.ctrlaltdel.world/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/', disallow: ['/checkout', '/account', '/docs', '/previews'] }]
      }
    },
    {
      resolve: 'gatsby-plugin-loadable-components-ssr',
      options: {
        useHydrate: true
      }
    },
    {
			resolve: 'gatsby-plugin-netlify',
			options: {
				mergeSecurityHeaders: false,
				headers: {
					'/preview': [
						// 'X-Frame-Options: DENY', allow iframe usage
						'X-XSS-Protection: 1; mode=block',
						'X-Content-Type-Options: nosniff',
						'Referrer-Policy: same-origin',
					],
				}
			}
		},
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `midway`,
        short_name: `midway`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon/apple-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        layout: require.resolve(`./src/layouts/index.tsx`)
      }
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/account/*`, `/docs/*`, `/previews/*`] },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        pages: path.join(__dirname, 'src/pages'),
        context: path.join(__dirname, 'src/context'),
        static: path.join(__dirname, 'static'),
        pages: path.join(__dirname, 'src/pages'),
        utils: path.join(__dirname, 'src/utils')
      }
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
  
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
