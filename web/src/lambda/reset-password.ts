import { APIGatewayEvent } from 'aws-lambda'
import axios from 'axios'

import {
  statusReturn,
  preparePayload,
  shopifyConfig,
  SHOPIFY_GRAPHQL_URL,
  CUSTOMER_TOKEN_QUERY,
  CUSTOMER_RESET_QUERY
} from './requestConfig'

let customer

export const handler = async (event: APIGatewayEvent): Promise<any> => {

  // TEST for POST request
  if (event.httpMethod !== 'POST' || !event.body) {
    return statusReturn(400, '')
  }

  let data

  try {
    data = JSON.parse(event.body)
  } catch (error) {
    console.log('JSON parsing error:', error);
    return statusReturn(400, { error: 'Bad request body' })
  }
  const payload = preparePayload(CUSTOMER_RESET_QUERY, {
    id: data.id,
    input: data.input
  })

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
    return statusReturn(500, { error: err[0].message })
  }

  const loginPayload = preparePayload(CUSTOMER_TOKEN_QUERY, {
    input: {
      email: customer.email,
      password: data.input.password
    }
  })

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
      return statusReturn(200, {
        token,
        customer
      })
    }
  } catch (err) {
    return statusReturn(500, { error: err.message })
  }
}