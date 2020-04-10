import { APIGatewayEvent } from 'aws-lambda'
import axios from 'axios'

import {
  headers,
  shopifyConfig,
  SHOPIFY_GRAPHQL_URL
} from './requestConfig'

const CUSTOMER_ADDRESS = `
  firstName
  lastName
  address1
  address2
  company
  phone
  city
  country
  province
  zip
`

const CUSTOMER_QUERY = `
query customerQuery($customerAccessToken: String!){
  customer(customerAccessToken: $customerAccessToken) {
    firstName
    lastName
    acceptsMarketing
    phone
    email
    defaultAddress {
      ${CUSTOMER_ADDRESS}
    }
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
}`

exports.handler = async (event: APIGatewayEvent): Promise<any> => {

  if (event.httpMethod !== 'POST' || !event.body) {
    return {
      statusCode: 400,
      headers,
      body: ''
    }
  }

  let data: {
    email?: string
    password?: string
  };

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
    query: `mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          userErrors {
            field
            message
          }
          customerAccessToken {
            accessToken
            expiresAt
          }
        }
      }
    `,
    variables: {
      input: {
        email: data.email,
        password: data.password
      }
    }
  }
  try {
    token = await axios({
      url: SHOPIFY_GRAPHQL_URL,
      method: 'POST',
      headers: shopifyConfig,
      data: JSON.stringify(payload)
    })
    if (token.data.data.customerAccessTokenCreate.userErrors.length > 0) {
      throw token.data.data.customerAccessTokenCreate.userErrors
    } else {
      token = token.data.data.customerAccessTokenCreate.customerAccessToken.accessToken
    }
  } catch (err) {
    let response = {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        error: 'Problem with email or password'
      })
    }
    return response
  }

  const payloadCustomer = {
    query: CUSTOMER_QUERY,
    variables: {
      customerAccessToken: token
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
