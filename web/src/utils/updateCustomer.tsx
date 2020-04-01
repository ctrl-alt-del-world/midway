import cookie from "js-cookie"

export const UpdateCustomer = (res: {
  token: string
  customer: {
    firstName: string
  }
}, email: string) => {
  console.log('update cussss', res, email)
  cookie.set("customer_token", res.token, { expires: 25 })
  cookie.set("customer_firstName", res.customer.firstName, {
    expires: 25,
  })
  cookie.set("customer_email", email, { expires: 25 })
}