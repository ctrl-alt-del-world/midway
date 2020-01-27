# Modified Custom starter kit with [Gatsby](https://www.gatsbyjs.org/), [Sanity.io](https://www.sanity.io), & a webhook to create Shopify products into Sanity

BIG thanks to 🍝  [Kevin Green](https://github.com/iamkevingreen) 🍝 for the `web/functions` help

Clone this repository to bootstrap a fresh Gatsby site, powered by Sanity CMS and dynamically import Shopify products to Sanity with the help of a WebHook

## Basic Instructions

### Studio/
1. In the `studio` folder run `sanity init` and create a new project.
2. Update `studio/sanity.json` and update the Project ID
3. Update the studio name in `studio/package.json`
3. Edit schemas, add different content type, find out more here: [Sanity Docs](https://www.sanity.io/docs/sanity-studio)
4. Include these schemas in the `deskStructure.js` export (include a fun icon!)

### Web/
1. Rename `env.example` to `.env`
2. Enter the Sanity API keys to `.env` file
3. Modify `gatsby-config.js` and add your site title, etc.
3. Develop your front end, etc.

## Shopify 

1. In your netlify environment, go to your project and create a new Function
2. Set the functions directory to be the `functions/` folder in your `web/` project
3. In Shopify, go to `Settings -> Notifications -> Webhooks` and create webhooks for Product Creation & Product Updates. Set the webhook's Callback URL to `[https://YOUR_URL.DOMAIN/.netlify/functions/shopify]`

## Features

**A blank slate Gatsby site w custom webhook to create new Shopify products**
  * 📡 Real-time content preview in development
  * ⏱ Fast & frugal builds
  * 🗃 No accidental missing fields/types
  * 🧰 Full Render Control with Portable Text
  * 📸 gatsby-image support
  * 🔧 Minimal configuration

**Sanity Studio with a schema for**
  * 🏢 Site settings
  * 📃 Pages
  * 📰 Posts
  * 🛍 Products


## Enable Gatsby watch mode for drafts

We have enabled the watch mode in the `gatsby-source-sanity` plugin, which means that your frontend will automatically update with content changes whenever you publish them. If you want the frontend to show content changes in real time, you must do the following:

* Go to [manage.sanity.io](https://manage.sanity.io) and find your project (or run the command `sanity manage` in the studio folder)
* Navigate to Settings->API and scroll down to the **Tokens** section
* Add a new token and give it **read** privileges.
* Copy the `.env-example` file to a file called `.env` in the `/web` folder
* Add your new token to the key: `SANITY_TOKEN="<token here>"`

If you restart the local development server, it will now show unpublished changes from the Studio. Note that the `.env` file is ignored by Git, because the token gives access to unpublished content in the API.

## License

MIT
