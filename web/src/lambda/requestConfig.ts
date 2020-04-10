const {
  SHOPIFY_TOKEN,
  SHOPIFY_GRAPHQL_URL
} = process.env

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
}

const shopifyConfig = {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN
}

export {
  headers,
  shopifyConfig,
  SHOPIFY_GRAPHQL_URL
}