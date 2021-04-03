
import ShopifyClient from 'shopify-buy'

export const Shopify = ShopifyClient.buildClient({
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN,
  domain: process.env.GATSBY_SHOPIFY_STORE
})
