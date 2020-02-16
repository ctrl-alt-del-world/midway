// shopify-buy types are out of date in @types/shopify-buy,
// so we'll want to extend some of the interfaces to include
// functions we know exist, and want to use

// spicy overrides

// @ts-ignore
import ShopifyBuy from 'shopify-buy'
import LineItem = ShopifyBuy.LineItem

// @ts-ignore
export interface ShopifyLineItem extends LineItem {
  customAttributes: any
  id: string
  image: string
  smallImage: string
  variant: {
    sku: string
    id: string
    title: string
    price: string
    image: {
      src: string
    }
  }
  title: string
  quantity: number
  price: string
}

export type ShopifyCartID = string

// @ts-ignore
export interface ShopifyCart extends ShopifyBuy.Cart {
  id: ShopifyCartID
  email: string
  webUrl: string
  lineItems: ShopifyLineItem[]
  totalTax: string
  shippingLine: null | string
  totalPrice: string
}
