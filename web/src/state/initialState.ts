import { ShopifyCart } from "src/types/shopifyTypes"

export interface StateInterface {
  cart: any | null
  checkoutId: string | null
  customerToken: string | null
  email: string | null
  cartOpen: boolean | false
  navOpen: boolean | false
  shopOpen: boolean | false
  activeVariant: string | null
  shopifyCart: ShopifyCart | null
}

const state: StateInterface = {
  cart: null,
  checkoutId: null,
  customerToken: null,
  email: null,
  cartOpen: false,
  navOpen: false,
  shopOpen: false,
  activeVariant: null,
  shopifyCart: null
}

export default state
