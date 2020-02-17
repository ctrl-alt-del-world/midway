import cookie from "js-cookie"

import store from "../state/store"

export const UpdateCustomer = (res: {
  token: string
  customer: {
    firstName: string
    defaultAddress: {}
    orders: []
  }
}, email: string) => {
  cookie.set("customer_token", res.token, { expires: 25 })
  cookie.set("customer_firstName", res.customer.firstName, {
    expires: 25,
  })
  cookie.set("customer_email", email, { expires: 25 })
  cookie.set("customer_defaultAddress", res.customer.defaultAddress)
  store.hydrate({
    customerToken: res.token,
    email,
    firstName: res.customer.firstName,
    orders: res.customer.orders
  })()
}