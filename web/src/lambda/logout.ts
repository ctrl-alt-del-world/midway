const axios = require("axios")

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}

const { SHOPIFY_TOKEN, SHOPIFY_GRAPHQL_URL } = process.env

const shopifyConfig = {
  "Content-Type": "application/json",
  "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
}

exports.handler = async (event, context) => {

  if (event.httpMethod !== "POST" || !event.body) {
    return {
      statusCode: 400,
      headers,
      body: "",
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
    query: `mutation customerAccessTokenDelete($customerAccessToken: String!) {
        customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
          userErrors {
            field
            message
          }
          deletedAccessToken
          deletedCustomerAccessTokenId
        }
      }
    `,
    variables: {
      customerAccessToken: data.accessToken,
    },
  }
  try {
    let logout = await axios({
      url: SHOPIFY_GRAPHQL_URL,
      method: "POST",
      headers: shopifyConfig,
      data: JSON.stringify(payload),
    })
    let response = {
      statusCode: 200,
      headers,
      body: "",
    }
    return response
  } catch (err) {

    let response = {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: err[0],
      }),
    }
    return response
  }
}
