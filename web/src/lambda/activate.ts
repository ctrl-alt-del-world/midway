import { APIGatewayEvent } from 'aws-lambda'
import axios from 'axios'

import {
  headers,
  shopifyConfig,
  SHOPIFY_GRAPHQL_URL
} from './requestConfig'
}

exports.handler = async (event: APIGatewayEvent): Promise<any> => {
  // TEST for POST request
  if (event.httpMethod !== 'POST' || !event.body) {
    return {
      statusCode: 400,
      headers,
      body: ''
    }
  }

  let data;

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
    query: `
      mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
        customerActivate(id: $id, input: $input) {
          userErrors {
            field
            message
          }
          customer {
            email
          }
        }
      }
    `,
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
      let response = {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          data: customer
        })
      }
      return response
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
}