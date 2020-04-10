import { APIGatewayEvent } from 'aws-lambda'
import axios from 'axios'

import {
  statusReturn,
  preparePayload,
  shopifyConfig,
  SHOPIFY_GRAPHQL_URL,
  CUSTOMER_QUERY
} from './requestConfig'

export const handler = async (event: APIGatewayEvent): Promise<any> => {
  if (event.httpMethod !== 'POST' || !event.body) return statusReturn(400, '')
  let data: {
    token: string
  }

  try {
    data = JSON.parse(event.body)
  } catch (error) {
    console.log('JSON parsing error:', error);
    return statusReturn(400, { error: 'Bad request body' })
  }

  const payload = preparePayload(CUSTOMER_QUERY, {
    customerAccessToken: data.token
  })

  try {
    let customer = await axios({
      url: SHOPIFY_GRAPHQL_URL,
      method: 'POST',
      headers: shopifyConfig,
      data: JSON.stringify(payload)
    })
    customer = customer.data.data.customer

    return statusReturn(200, {
      token: data.token,
      customer
    })
  } catch (err) {
    console.log(err)
    return statusReturn(500, { error: err.message })
  }
}