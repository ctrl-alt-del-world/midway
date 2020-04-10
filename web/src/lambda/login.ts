import { APIGatewayEvent } from 'aws-lambda'
import axios from 'axios'

import {
  headers,
  shopifyConfig,
  SHOPIFY_GRAPHQL_URL,
  CUSTOMER_QUERY,
  CUSTOMER_TOKEN_QUERY
} from './requestConfig'

exports.handler = async (event: APIGatewayEvent): Promise<any> => {
  if (event.httpMethod !== 'POST' || !event.body) {
    return {
      statusCode: 400,
      headers,
      body: ''
    }
  }

  let data: {
    email?: string
    password?: string
  };

  let accessToken

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
    query: CUSTOMER_TOKEN_QUERY,
    variables: {
      input: {
        email: data.email,
        password: data.password
      }
    }
  }
  try {
    const token = await axios({
      url: SHOPIFY_GRAPHQL_URL,
      method: 'POST',
      headers: shopifyConfig,
      data: JSON.stringify(payload)
    })
    if (token.data.data.customerAccessTokenCreate.userErrors.length > 0) {
      throw token.data.data.customerAccessTokenCreate.userErrors
    } else {
      accessToken = token.data.data.customerAccessTokenCreate.customerAccessToken.accessToken
    }
  } catch (err) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        error: 'Problem with email or password'
      })
    }
  }

  const payloadCustomer = {
    query: CUSTOMER_QUERY,
    variables: {
      customerAccessToken: accessToken
    }
  }

  try {
    let customer = await axios({
      url: SHOPIFY_GRAPHQL_URL,
      method: 'POST',
      headers: shopifyConfig,
      data: JSON.stringify(payloadCustomer)
    })
    customer = customer.data.data.customer
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        token: accessToken,
        customer
      })
    }
  } catch (err) {

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: err.message
      })
    }
  }
}
