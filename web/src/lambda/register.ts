import { APIGatewayEvent } from 'aws-lambda'
import axios from 'axios'

import {
  statusReturn,
  preparePayload,
  shopifyConfig,
  SHOPIFY_GRAPHQL_URL,
  CUSTOMER_TOKEN_QUERY,
  CUSTOMER_CREATE_QUERY
} from './requestConfig'

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

  console.log(`[λ: new account]`, { email: data.email, password: data.password, firstName: data.firstName, lastName: data.lastName })
  const payload = preparePayload(CUSTOMER_CREATE_QUERY, {
    input: {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName
    }
  })

  try {
    let customer = await axios({
      url: SHOPIFY_GRAPHQL_URL,
      method: 'POST',
      headers: shopifyConfig,
      data: payload
    })

    const { customerCreate } = customer.data.data

    if (customer.data.errors) throw customer.data.errors[0]
    if (customerCreate.userErrors.length > 0) throw customerCreate.userErrors[0]

    // If that was successful lets log our new user in
    const loginPayload = preparePayload(CUSTOMER_TOKEN_QUERY, {
      input: {
        email: data.email,
        password: data.password
      }
    })
    

    try {
      let token = await axios({
        url: SHOPIFY_GRAPHQL_URL,
        method: 'POST',
        headers: shopifyConfig,
        data: loginPayload
      })
      const {
        customerAccessTokenCreate
      } = token.data.data
      if (customerAccessTokenCreate.userErrors.length > 0) {
        throw customerAccessTokenCreate.userErrors
      } else {
        token = customerAccessTokenCreate.customerAccessToken.accessToken
        // Manipulate the response and send some customer info back down that we can use later
        return statusReturn(200, {
          token,
          customer: {
            firstName: data.firstName,
            lastName: data.lastName
          }
        })
      }
    } catch (err) {
      return statusReturn(500, { error: err[0].message })
    }
  } catch (err) {
    return statusReturn(500, { error: err.message })
  }
}
