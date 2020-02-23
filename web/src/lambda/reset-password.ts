const axios = require('axios')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type'
}
const {
  SHOPIFY_TOKEN,
  SHOPIFY_GRAPHQL_URL
} = process.env;

const shopifyConfig = {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN
}

exports.handler = async (event, context, callback) => {

  // TEST for POST request
  if (event.httpMethod !== 'POST' || !event.body) {
    return {
      statusCode: 400,
      headers,
      body: ''
    }
  }

  let data

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
      mutation customerReset($id: ID!, $input: CustomerResetInput!) {
        customerReset(id: $id, input: $input) {
          userErrors {
            field
            message
          }
          customer {
            email
          }
        }
      }
    `,
    variables: {
      id: data.id,
      input: data.input
    }
  }

  let customer

  try {
    customer = await axios({
      url:  SHOPIFY_GRAPHQL_URL,
      method: 'POST',
      headers: shopifyConfig,
      data: JSON.stringify(payload)
    })

    if (customer.data.data.customerReset.userErrors.length > 0) {
      throw customer.data.data.customerReset.userErrors
    } else {
      customer = customer.data.data.customerReset.customer
    }
  } catch (err) {

    let response = {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: err[0].message
      })
    }
    return response
  }

  const loginPayload = {
    query: `mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          userErrors {
            field
            message
          }
          customerAccessToken {
            accessToken
            expiresAt
          }
        }
      }
    `,
    variables: {
      input: {
        email: customer.email,
        password: data.input.password
      }
    }
  }

  try {
    let token = await axios({
      url: SHOPIFY_GRAPHQL_URL,
      method: 'POST',
      headers: shopifyConfig,
      data: JSON.stringify(loginPayload)
    })
    if (token.data.data.customerAccessTokenCreate.userErrors.length > 0) {
      throw token.data.data.customerAccessTokenCreate.userErrors
    } else {
      token = token.data.data.customerAccessTokenCreate.customerAccessToken.accessToken
      let response = {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          token,
          customer
        })
      }
      return response
    }
  } catch (err) {

    let response = {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: err.message
      })
    }
    return response
  }
}