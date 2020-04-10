import { APIGatewayEvent } from 'aws-lambda'
import axios from 'axios'

import {
  statusReturn,
  preparePayload,
  shopifyConfig,
  SHOPIFY_GRAPHQL_URL,
  CUSTOMER_LOGOUT_QUERY
} from './requestConfig'

let data

export const handler = async (event: APIGatewayEvent): Promise<any> => {
  if (event.httpMethod !== "POST" || !event.body) return statusReturn(400, '')
  
  try {
    data = JSON.parse(event.body)
  } catch (error) {
    return statusReturn(400, { error: 'Bad Request Body' })
  }
  const payload = preparePayload(CUSTOMER_LOGOUT_QUERY, {
    customerAccessToken: data.accessToken,
  })
  try {
    let logout = await axios({
      url: SHOPIFY_GRAPHQL_URL,
      method: "POST",
      headers: shopifyConfig,
      data: JSON.stringify(payload)
    })
    return statusReturn(200, '')
  } catch (err) {
    return statusReturn(500, { error: err[0] })
  }
}
