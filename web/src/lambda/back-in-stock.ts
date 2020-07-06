import { APIGatewayEvent } from 'aws-lambda'
import axios from 'axios'

import {
  statusReturn
} from './requestConfig'

let data: {
  email: string
  variant: number
  platform: string
  accountId: string
}

export const handler = async (event: APIGatewayEvent): Promise<any> => {
  if (event.httpMethod !== 'POST' || !event.body) return statusReturn(400, {})

  try {
    data = JSON.parse(event.body)
  } catch (error) {
    console.log('JSON parsing error:', error);
    return statusReturn(400, { error: 'Bad Request Body' })
  }
  
  const {
    accountId,
    email,
    platform,
    variant
  } = data

  const stringData = `a=${accountId}&email=${encodeURIComponent(email)}&variant=${variant}&platform=${platform}`
  try {
    let subscription = await axios({
      url: 'https://a.klaviyo.com/api/v1/catalog/subscribe',
      method: 'POST',
      data: stringData
    })
    
    return statusReturn(200, subscription.data)
  } catch (err) {
    console.log(err)
    return statusReturn(500, { error: err.message })
  }
}