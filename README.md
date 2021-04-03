> ⚠️ Sentry - I have Sentry set up in the build step, in the `netlify.toml` file. I recommend removing this if you don't want to use Sentry, working on abstracting it as optional

See Also: [HULL](https://github.com/ndimatteo/HULL) Next.js Shopify/Sanity Starter

# Midway v 0.87

> ⚠️ Disclaimer: The Gatsby theme is in active development as I work on documentation + extending the system, the studio is fairly ready for referenced use if you so desire. I will post a v1.0 once everything is in a better place hopefully very very soon :). I am working on creating a full shoppable/authed Shopify experience. The idea here is viewing products, adding them to a cart and getting to a real checkout, you will also be able to register, login, view orders, and also update your address (all traditional shopify experiences but in a headless environment).

> Typescript Support: I am no TS expert, and am doing my best with the knowledge I have there are some places that still have issues, like react CreateRef stuff, not really sure what to do with those bits (mostly in the accounts area), if you have experience here I would love some insight into fix that or making it more robust.

[![Maintainability](https://api.codeclimate.com/v1/badges/b3740045b486ca07badc/maintainability)](https://codeclimate.com/github/ctrl-alt-del-world/midway/maintainability)

Named for the sake of being the middle component missing from your ecom business. Think of this repo as a middlewear to anything and everything custom, ecom, DTC and headless.

### Starter kit for [Gatsby](https://www.gatsbyjs.org/), [Sanity.io](https://www.sanity.io), & Shopify

I've taken a relatively more opinionated approach and started to fully build out a complete expereince. The documentation is being written while the experience is created, please don't make issues/tickets just yet, if you have contributions around my TS linting/issues feel free to PR those aspects.

Clone this repository to bootstrap a fresh Typescript Gatsby site, powered by Sanity CMS and dynamically import Shopify products to Sanity with the help of a WebHook

## [Getting Started Guide](https://midway.ctrlaltdel.world/getting-started)

<details>
<summary>Basic Instructions</summary>

### Initial Setup
1. Remove remote repo by entering `rm -rf .git`
2. Either create a new repo in this folder and version control both Sanity & Gatsby, or set up new repos for both folders

### Studio/
1. In the `studio` folder run `sanity init` and create a new project.
2. Update the studio name in `studio/package.json`.
3. Edit schemas, add different content types, find out more here: [Sanity Docs](https://www.sanity.io/docs/sanity-studio)
4. Include these schemas in the `deskStructure.js` export (include a fun icon!)

The studio is ready/useful, I'll more than likely further modify the structure, like moving the default shopify items into a tab.

### Web/
1. Rename `env.example` to `.env` by typing `mv env.example .env` in your terminal.
2. Enter your Sanity API keys in the `.env` file.
  * `SANITY_API_TOKEN`
  * `SANITY_DATASET`
  * `SANITY_PROJECT_ID`
3. Enter your Shopify API keys and urls to the `.env` file.
   * `GATSBY_SHOPIFY_GRAPHQL_URL` - this url is to your Shopify store graphql data source. e.g - `[mystore].myshopify.com/api/graphql`  *NOTE:* there is no `http(s)` before the url structure
   * `GATSBY_SHOPIFY_STOREFRONT_TOKEN` - also known as the **Storefront Access Token**
   * `GATSBY_SHOPIFY_STORE` - this is the url to your Shopify store. e.g. - `https://[mystore].myshopify.com/` - *Note:* there is `https` before the URL
   * `SHOPIFY_WEBHOOK_SECRET` - this is your webhook secret. Once you create a webhook in Shopify you will see this token below your webhooks `https://[mystore].myshopify.com/admin/settings/notifications`
   * `SHOPIFY_API_KEY` - We use the Admin API to sync products, so we need this to fetch additional data in the sync function
   * `SHOPIFY_API_PASSWORD` - Again we need this for the Admin API in the product SYNC
4. Modify `gatsby-config.js` and add your site title, etc.
5. Develop your front end, etc. (purposely left this ultra stripped-down)
6. Create a repo specifically for your Gatsby build, host with Netlify or anywhere you can have a Lambda function.
</details>

<details>
<summary>Content Preview</summary>

### Why
Previewing content is a priority client experience. As a result we implement this out of the box, please keep in mind the pattern + graphql does require groq experience. I wrote an [article documenting](https://medium.com/the-couch/live-preview-in-gatsby-without-the-cost-21f8ac0337bb) this experience. I will echo some of that below for this particular experience.

### Enable API access to local for testing
Inside of the manage panel in Sanity, make sure you navigate to settings->api->cors origins and enable the localhost with the correct port, in our case `http://localhost:8000` with allow creditials.

### Frontend Preview
Inside of our Gatsby experience you'll notice a `previews.tsx` within our pages, you'll also find our config is extended with `gatsby-plugin-create-client-paths` to include the `previews/` route as a dynamic experience. This allows us to param this route without causing a 404 in Gatsby.

### Sanity preview locally
Inside  of the Sanity structure builder for `pages` and `products` I have referenced a new view component. This adds a preview link to the Sanity admin. That componenet: `studio/structure/views/preview.js` has a production url (where your live site lives) and a local url: `http://localhost:8000`, update accordingly.
</details>


<details>
<summary>Current Feature Status</summary>

✔️ Gatbsy Typescript style  
✔️ Fetching data and building pages from Sanity  
✔️ Cart object created via the buy-sdk  
✔️ Lambda functions being built from src->functions  
✔️ Ability to login  
✔️ Ability to register  
✔️ Ability to logout  
✔️ Better error handling for register  
✔️ Ability to activate accounts  
✔️ Ability to forgot passwords  
✔️ Ability to reset passwords  
✔️ account status in the header + logout  
✔️ view single product detail  
✔️ ability to add to cart  
✔️ Ability to quick add to cart  
✔️ cart visible on the frontend  
✔️ Add/remove items from the cart  
✔️ Ability to see orders  
✖️ Add/remove addresses  
✖️ Ability to see/edit addresses  
</details>


#### Feature roadmap
✔️ 🍝 Klaviyo Newsletter  
✔️ 🍝 Klaviyo Waitlisting for out of stock products  
✔️ 🍝 Product schema json-ld  
✔️ 🍝 Focus States & Tab Index for ADA  
✔️ 🍝 Seo Meta out of the Box (this works but i have a no-follow on robots.txt)  
✔️ 🍝 Sanity Live Preview Content  
✔️ 🍝 Docz website?  
✔ 🍝 Add Analytics patterns   
✔️ 🍝 Add ability to do multi-variant selection  
✖️ 🍝 Add a single sync function via sane-sanity!!  
✖️ 🍝 Product carousel  
✖️ 🍝 Promo Bar in the schema  
✖️ 🍝 Mock Blog  
✖️ 🍝 Example PDP with extended modularity  
✖️ 🍝 Gatsby Create support for filling a sanity studio and getting a working frontend faster  

#### Bonus Features?
✔️ ✨ Sentry INIT  
✖️ ✨ Sentry Function logging  
✖️ ✨ netlify plugins (a11y/gatsby booster)  
✖️ ✨ Logrocket pattern  
✖️ ✨ jest testing  

### Shopify/
In the Shopify folder I provide an example theme.liquid file, this file is needed if you intend to add accounts to your headless environment (which this theme has functional components to support), shopify doesn't allow you to override the URL structure of the account information, so we redirect to where the headless experience lives. We also pass the hash/pathname etc so we can use that in our headless account system.

Please keep in mind I assume you are already familiar with the Shopify eco system, this repo assumes you've already crafted ecommerce experiences before.

### Shopify

1. In your Netlify environment, go to your project and create a new Function.
2. Set the functions directory to be the `functions/` folder in your project.
3. In Shopify, go to `Settings -> Notifications -> Webhooks` and create webhooks for Product Creation, Updates, & Deletions (⚠️ Be careful with how you implement this, see more [here](https://github.com/lucasvocos/gatsby-sanity-shopify/blob/d69ed053dfa3e21b17a1c10e1b5697044774f70d/web/functions/shopify.js#L171)). Set the webhook's Callback URL to `[https://YOUR_URL.DOMAIN/.netlify/functions/shopify-sync]` (if using Netlify, otherwise point to your provider's Lambda location)

<details>
<summary>Local Development of Functions</summary>
You can alternatively run your webhook locally, you can do this with ngrok
  <ol>
    <li>npm install ngrok -g</li>
<li>ngrok http [:PORT]</li>
<li>Point Shopify webhook to the above url +  /.netlify/functions/shopify-sync</li>
  </ol>
</details>

## Features

**Gatsby site with real integrations into a Shopify Instance**
  * 👨‍💻 TYPESCRIPT
  * 🛒 Shopping Cart create powered by Shopify Buy SDK
  * 📡 Real-time content preview in development
  * ⏱ Fast & frugal builds
  * 🗃 No accidental missing fields/types
  * 🧰 Full Render Control with Portable Text
  * 📸 gatsby-image support
  * 🔧 Minimal configuration
  * 💆‍♀️ Headless Account Managements via `/accounts/*`
  * 📹 Headless Preview via `/previews/*`
  * 📹 Inline studio documentation via `/docs/*`
  * 💻 Custom lambda function that will create/update products from Shopify, as well as flag deleted items

**Sanity Studio with a schema for**
  * 🖼️ Media Plugin
  * 👨‍💻 Vision Plugin
  * 🚀 Graphql Deployment Support
  * 📹 Preview via panes
  * 🔀 Redirects
  * 🏢 Site settings
    * Menu configuration pattern
    * Basic Footer configuration pattern
  * 📃 Pages
    * Meta Card support for SEO with Tabs
    * Common modularity patterns
  * 📰 Posts
  * 📫 Subscriptions sync'd from Shopify/Recharge
  * 🛍 Products & Variants
    * Products have default settings for `title`, `slug`, `defaultPrice`, `id`, `productId`.
    * Products have a subscription flag so you can easily hide recharge duplicated products + a subscription reference for linking to the recharge related subscription
    * Variants have default settings for `id`, `productId`, `variantId`, `title`, `variantTitle`, `sku`, and `price`.
    * The `web/src/lambda/shopify` file will generate new Sanity documents with these default fields.

## Credits
 * Thanks to [Lucas](https://github.com/lucasvocos/gatsby-sanity-shopify) for kicking this whole thing off.  
 * [Ian](https://github.com/dictions) with the smooth react-transition-group page transitions  
 * [Ian] For his analytics pattern  
 * [Trevor](https://github.com/thetrevorharmon) for the siteContext component from his [Gatsby-Shopify-Starter](https://github.com/thetrevorharmon/sell-things-fast/blob/master/src/context/StoreContext.js)  
 * [David](https://github.com/blimpmason) for fixing the scrollTop on page transition  


## More learning

* [Sample company website built with Gatsby & Sanity.io](https://github.com/sanity-io/example-company-website-gatsby-sanity-combo)
* [Sanity + Shopify Roundtable: Headless ecommerce with Kevin Green & Joseph Thomas](https://www.youtube.com/watch?v=4mgI333aGvo)

## License

MIT
