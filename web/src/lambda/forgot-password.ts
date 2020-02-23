const axios = require('axios')

const {
  SHOPIFY_TOKEN,
  SHOPIFY_GRAPHQL_URL
} = process.env;

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type'
}

const shopifyConfig = {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN
}

exports.handler = async (event, context, callback) => {

  console.log('found?')
  if (event.httpMethod !== 'POST' || !event.body) {
    return {
      statusCode: 400,
      headers,
      body: ''
    }
  }

  let data: {
    email?: string
  };

  console.log('data', event.body)

  try {
    data = JSON.parse(event.body)
  } catch (error) {
    console.log('JSON parsing error:', error);

    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Bad request body'
      })
    };
  }
  const payload = {
    query: `
      mutation customerRecover($email: String!) {
        customerRecover(email: $email) {
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      email: data.email
    }
  }

  try {
    const customer = await axios({
      url: SHOPIFY_GRAPHQL_URL,
      method: 'POST',
      headers: shopifyConfig,
      data: JSON.stringify(payload)
    })
    const {
      data,
      errors
    } = customer.data
    const { customerRecover } = data
    if (customerRecover && customerRecover.userErrors.length > 0) {
      throw customerRecover.userErrors
    } else if (errors && errors.length > 0) {
      throw errors
    } else {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          customerRecover: customerRecover
        })
      }
    }
  } catch (err) {

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: err[0].message
      })
    }
  }
}
