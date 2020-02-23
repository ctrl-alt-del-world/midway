import cookie from "js-cookie"
import shop from "../shopify"
import store from "../../src/state/store"
import { decode } from "shopify-gid"

/*

  NOT IN USE:

    This file is a reference for myself, we're not actually using this.
    I have decided to give the whole context way a shot, but I still want this file 
    for additional reference use.

    */

export function create() {
  console.log('create')
  return shop.checkout
    .create()
    .then(checkout => {

      const checkoutId = checkout.id
      cookie.set("customer_cart", checkoutId, { expires: 25 })
      const customerToken = cookie.get("customer_token")
      const customerEmail = cookie.get("customer_email")
      const firstName = cookie.get("customer_firstName")

      store.hydrate({
        checkoutId,
        shopifyCart: checkout,
        customerToken,
        email: customerEmail,
        firstName
      })()

      return checkout
    })
    .catch(e => {
      console.log('create error', e)
    })
}

export function hydrateAddress(id, address) {
  const jAddress = JSON.parse(address)
  delete jAddress.id
  setTimeout(() => {
    shop.checkout.updateShippingAddress(id, jAddress).catch(e => {
      console.log(e)
      throw e
    })
  }, 500)
}

// This function fetches all products, may not apply to all systems, use if needed
export function products() {
  // Mount our products into the dom for inventory checking
  shop.product.fetchAll().then((products) => {
    window.PRODUCTS = products
    // Create a split out array of all variants
    const variantInvetory = []
    products.forEach(product => {
      product.variants.forEach(variant => {
        const smartVariant = {
          id: parseInt(decode(variant.id).id, 10),
          available: variant.available
        }
        variantInvetory.push(smartVariant)
      })
    })
    window.PRODUCT_INVENTORY = variantInvetory
  })
}

export function hydrate() {
  const checkoutId = cookie.get("customer_cart")
  const customerToken = cookie.get("customer_token")
  const customerEmail = cookie.get("customer_email")
  const firstName = cookie.get("customer_firstName")

  if (checkoutId && customerEmail) {
    store.hydrate({ checkoutId })()

    return shop.checkout
      .fetch(checkoutId)
      .then(checkout => {
        let quantity = 0

        if (!checkout.completedAt) {
          shop.checkout.updateEmail(checkoutId, customerEmail)

          checkout.lineItems.forEach((item, i) => {
            quantity += item.quantity
            checkout.lineItems[i].smallImage = shop.image.helpers.imageForSize(
              item.variant.image,
              { maxWidth: 300, maxHeight: 300 }
            )
          })
        }

        return checkout.completedAt
          ? create()
          : store.hydrate({
            shopifyCart: checkout,
            quantity,
            customerToken,
            email: customerEmail,
            firstName
          })()
      })
      .catch(e => {
        console.log('hydrate error', e)
      })
  } else if (checkoutId) {
    store.hydrate({ checkoutId })
    return shop.checkout
      .fetch(checkoutId)
      .then(checkout => {
        let quantity = 0
        if (!checkout.completedAt) {
          checkout.lineItems.forEach((item, i) => {
            quantity += item.quantity
            checkout.lineItems[i].smallImage = shop.image.helpers.imageForSize(
              item.variant.image,
              { maxWidth: 300, maxHeight: 300 }
            )
          })
        }
        return checkout.completedAt
          ? create()
          : store.hydrate({
            shopifyCart: checkout,
            quantity,
            customerToken,
            email: customerEmail,
            firstName
          })()
      })
      .catch(e => {
        console.log(e)
      })
  } else {
    return create().catch(e => {
      console.log('yo?', e)
    })
  }
}

export function add(items) {
  items = [].concat(items)

  return shop.checkout
    .addLineItems(store.state.checkoutId, items)
    .then(checkout => {
      let quantity = 0
      checkout.lineItems.forEach((item, i) => {
        quantity += item.quantity
        checkout.lineItems[i].smallImage = shop.image.helpers.imageForSize(
          item.variant.image,
          { maxWidth: 300, maxHeight: 300 }
        )
      })
      store.hydrate({ shopifyCart: checkout, quantity, cartOpen: true })()
    })
    .catch(e => {
      console.log(e)
    })
}

export function remove(ids) {
  ids = [].concat(ids)

  return shop.checkout
    .removeLineItems(store.state.checkoutId, ids)
    .then(checkout => {
      let quantity = 0
      checkout.lineItems.forEach((item, i) => {
        quantity += item.quantity
        checkout.lineItems[i].smallImage = shop.image.helpers.imageForSize(
          item.variant.image,
          { maxWidth: 100, maxHeight: 100 }
        )
      })
      store.hydrate({ shopifyCart: checkout, quantity })()
    })
    .catch(e => {
      console.log(e)
    })
}

export function update(items) {
  items = [].concat(items)

  return shop.checkout
    .updateLineItems(store.state.checkoutId, items)
    .then(checkout => {
      let quantity = 0
      checkout.lineItems.forEach((item, i) => {
        quantity += item.quantity
        checkout.lineItems[i].smallImage = shop.image.helpers.imageForSize(
          item.variant.image,
          { maxWidth: 100, maxHeight: 100 }
        )
      })
      store.hydrate({ shopifyCart: checkout, quantity })()
    })
    .catch(e => {
      console.log(e)
    })
}

export function applyDiscountCode(code) {
  return shop.checkout
    .addDiscount(store.state.checkoutId, code)
    .then(checkout => {
      let quantity = 0
      checkout.lineItems.forEach((item, i) => {
        quantity += item.quantity
        checkout.lineItems[i].smallImage = shop.image.helpers.imageForSize(
          item.variant.image,
          { maxWidth: 300, maxHeight: 300 }
        )
      })
      store.hydrate({ shopifyCart: checkout, quantity })()

      const error = checkout.userErrors.length > 0

      return { error, checkout }
    })
    .catch(e => {
      console.log(e)
    })
}

export function updateEmail(email) {
  return shop.checkout
    .updateEmail(store.state.shopifyCart.id, email)
    .then(checkout => {
      store.hydrate({ shopifyCart: checkout })()
      store.hydrate({ email })()
      cookie.set("customer_email", email)
    })
    .catch(e => {
      console.log(e)
    })
}