export interface ProductInt {
  _id: string
  content: {
    main: {
      title: string
      mainImage: {
        asset: {
          _id: string
          _ref: string
        }
      }
      slug: {
        current: string
      }
    }
    shopify: {
      defaultPrice: string
      productId: number
    }
    meta: {}
  }
}