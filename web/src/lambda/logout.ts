import { APIGatewayEvent } from 'aws-lambda'
import axios from 'axios'

import {
  statusReturn,
  shopifyConfig,
  SHOPIFY_GRAPHQL_URL,
  CUSTOMER_LOGOUT_QUERY
} from './requestConfig'

let data

exports.handler = async (event: APIGatewayEvent): Promise<any> => {
  if (event.httpMethod !== "POST" || !event.body) return statusReturn(400, '')
  
  try {
    data = JSON.parse(event.body)
  } catch (error) {
    return statusReturn(400, { error: 'Bad Request Body' })
  }
  const payload = {
    query: CUSTOMER_LOGOUT_QUERY,
    variables: {
      customerAccessToken: data.accessToken,
    },
  }
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
