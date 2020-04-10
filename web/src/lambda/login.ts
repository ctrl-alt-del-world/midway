import { APIGatewayEvent } from 'aws-lambda'
import axios from 'axios'

import {
  statusReturn,
  preparePayload,
  shopifyConfig,
  SHOPIFY_GRAPHQL_URL,
  CUSTOMER_QUERY,
  CUSTOMER_TOKEN_QUERY
} from './requestConfig'

let data: {
  email?: string
  password?: string
}

let accessToken

export const handler = async (event: APIGatewayEvent): Promise<any> => {
  if (event.httpMethod !== 'POST' || !event.body) return statusReturn(400, {})

  try {
    data = JSON.parse(event.body)
  } catch (error) {
    console.log('JSON parsing error:', error);
    return statusReturn(400, { error: 'Bad Request Body' })
  }

  const payload = preparePayload(CUSTOMER_TOKEN_QUERY, {
    input: {
      email: data.email,
      password: data.password
    }
  })
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
    return statusReturn(200, { error: 'Problem with email or password' })
  }

  const payloadCustomer = preparePayload(CUSTOMER_QUERY, {
    customerAccessToken: accessToken
  })

  try {
    let customer = await axios({
      url: SHOPIFY_GRAPHQL_URL,
      method: 'POST',
      headers: shopifyConfig,
      data: JSON.stringify(payloadCustomer)
    })
    customer = customer.data.data.customer
    return statusReturn(200, {
      token: accessToken,
      customer
    })
  } catch (err) {
    return statusReturn(500, { error: err.message })
  }
}
