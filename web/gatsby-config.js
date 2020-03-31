// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`,
// })
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
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
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        token: process.env.SANITY_API_TOKEN
      }
    },

    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/account/*`] },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        pages: path.join(__dirname, 'src/pages'),
        context: path.join(__dirname, 'src/context'),
        static: path.join(__dirname, 'static'),
        pages: path.join(__dirname, 'src/pages')
      }
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`postcss-preset-env`)({ stage: 0 }),
          require('postcss-import'),
          require('postcss-nested'),
          require('postcss-cssnext'),
          require('postcss-calc'),
          require('postcss-discard-comments'),
          require('postcss-reporter')
        ]
      }
    },
  
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
