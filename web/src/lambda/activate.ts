import { APIGatewayEvent } from 'aws-lambda'
import axios from 'axios'

import {
  statusReturn,
  shopifyConfig,
  SHOPIFY_GRAPHQL_URL,
  CUSTOMER_ACTIVATE_QUERY
} from './requestConfig'

exports.handler = async (event: APIGatewayEvent): Promise<any> => {
  // TEST for POST request
  if (event.httpMethod !== 'POST' || !event.body) {
    return statusReturn(400, '')
  }

  let data;

  try {
    data = JSON.parse(event.body)
  } catch (error) {
    console.log('JSON parsing error:', error);
    return statusReturn(400, { error: 'Bady Request Body' })
  }

  const payload = {
    query: CUSTOMER_ACTIVATE_QUERY,
    variables: {
      id: data.id,
      input: data.input
    }
  }

  let customer

  try {
    customer = await axios({
      url: SHOPIFY_GRAPHQL_URL,
      method: 'POST',
      headers: shopifyConfig,
      data: JSON.stringify(payload)
    })
    if (customer.data.data.customerActivate.userErrors.length > 0) {
      throw customer.data.data.customerActivate.userErrors
    } else {
      customer = customer.data.data.customerActivate
      return statusReturn(200, { data: customer })
    }
  } catch (err) {
    return statusReturn(500, { error: err[0].message })
  }
}