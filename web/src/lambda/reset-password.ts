import { APIGatewayEvent } from 'aws-lambda'
import axios from 'axios'

import {
  headers,
  shopifyConfig,
  SHOPIFY_GRAPHQL_URL,
  CUSTOMER_TOKEN_QUERY,
  CUSTOMER_RESET_QUERY
} from './requestConfig'

exports.handler = async (event: APIGatewayEvent): Promise<any> => {

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
    query: CUSTOMER_RESET_QUERY,
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
    query: CUSTOMER_TOKEN_QUERY,
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