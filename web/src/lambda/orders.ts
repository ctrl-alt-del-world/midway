import { APIGatewayEvent } from 'aws-lambda'
import axios from 'axios'

import {
  headers,
  shopifyConfig,
  SHOPIFY_GRAPHQL_URL,
  CUSTOMER_QUERY
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
    token: string
  }

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

  const payloadCustomer = {
    query: CUSTOMER_QUERY,
    variables: {
      customerAccessToken: data.token
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
        token: data.token,
        customer
      })
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: err.message
      })
    }
  }


}