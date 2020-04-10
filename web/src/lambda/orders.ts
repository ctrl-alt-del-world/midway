import { APIGatewayEvent } from 'aws-lambda'
import axios from 'axios'

import {
  headers,
  shopifyConfig,
  SHOPIFY_GRAPHQL_URL
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
    query: `query customerQuery($customerAccessToken: String!){
      customer(customerAccessToken: $customerAccessToken) {
        firstName
        lastName
        acceptsMarketing
        phone
        email
        orders(first:100){
          edges{
            node{
              orderNumber
              totalPrice
              processedAt
              statusUrl
              successfulFulfillments(first: 100){
                trackingInfo(first: 100){
                  number
                  url
                }
              }
              lineItems(first:100){
                edges{
                  node{
                    quantity
                    title
                    variant{
                      title
                      price
                      image{
                        originalSrc
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`,
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
    let response = {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        token,
        customer
      })
    }
    return response
  } catch (err) {
    console.log(err)
    let response = {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: err.message
      })
    }
    return response
  }


}