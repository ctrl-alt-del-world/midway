import { APIGatewayEvent } from 'aws-lambda'
import axios from 'axios'

import {
  headers,
  shopifyConfig,
  SHOPIFY_GRAPHQL_URL,
  CUSTOMER_LOGOUT_QUERY
} from './requestConfig'

exports.handler = async (event: APIGatewayEvent): Promise<any> => {
  if (event.httpMethod !== "POST" || !event.body) {
    return {
      statusCode: 400,
      headers,
      body: "",
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
    return {
      statusCode: 200,
      headers,
      body: ""
    }
  } catch (err) {

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: err[0]
      })
    }
  }
}
