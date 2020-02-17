/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

const checkout = require('./api/ecommerce/checkout')

exports.onInitialClientRender = () => {
  // Hydrate the checkout on client entry
  checkout.hydrate()
  // Fetches products, more on this later if we use it
  // checkout.products()
}
