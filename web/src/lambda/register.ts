
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

  console.log(`[λ: new account]`, { email: data.email, password: data.password, firstName: data.firstName, lastName: data.lastName })

  const payload = {
    query: `mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        userErrors {
          field
          message
        }
        customer {
          id
        }
        customerUserErrors {
          field
          message
        }
      }
    }`,
    variables: {
      input: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName
      }
    }
  }
  try {
    let customer = await axios({
      url: SHOPIFY_GRAPHQL_URL,
      method: 'POST',
      headers: shopifyConfig,
      data: JSON.stringify(payload)
    })

    const { customerCreate } = customer.data.data

    if (customer.data.errors) throw customer.data.errors[0]
    if (customerCreate.userErrors.length > 0) throw customerCreate.userErrors[0]

    // If that was successful lets log our new user in
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
          email: data.email,
          password: data.password
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
      const {
        customerAccessTokenCreate
      } = token.data.data
      if (customerAccessTokenCreate.userErrors.length > 0) {
        throw customerAccessTokenCreate.userErrors
      } else {
        token = customerAccessTokenCreate.customerAccessToken.accessToken
        // Manipulate the response and send some customer info back down that we can use later
        let response = {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            token,
            customer: {
              firstName: data.firstName,
              lastName: data.lastName
            }
          })
        }
        return response
      }
    } catch (err) {

      let response = {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          error: err[0].message
        })
      }
      return response
    }
  } catch (err) {

    let response = {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        error: err.message
      })
    }
    return response
  }
}
