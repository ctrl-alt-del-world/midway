const siteRoute = "https://midway-starter.netlify.com"

function toPlainText(blocks = []) {
  return blocks
    .map((block: {
      _type: string
      children: any
    }) => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children.map((child: { text: any }) => child.text).join('')
    })
    .join('\n\n')
}

export const ProductSchema = (main: {
  title: string
  productDescription?: []
  mainImage?: {
    asset: {
      url: string
    }
  }
  slug: {
    current: string
  }
}, shopify: {
  defaultVariant: {
    sku: string
    price: string
  }
}) => {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": main.title,
    "image": main.mainImage && main.mainImage.asset.url,
    "description": main.productDescription && toPlainText(main.productDescription),
    "sku": shopify.defaultVariant.sku,
    "mpn": shopify.defaultVariant.sku,
    "price": shopify.defaultVariant.price,
    "brand": {
      "@type": "Thing",
      "name": "Midway"
    },
    "offers": {
      "@type": "Offer",
      "url": `${siteRoute}/products/${main.slug.current}`,
      "priceCurrency": "USD",
      "price": shopify.defaultVariant.price,
      "itemCondition": "https://schema.org/UsedCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Midway"
      }
    },
    // FIXME: If you have reviews modify this area
    // "aggregrateRating": {
    //   "@type": "AggregateRating",
    //   "ratingValue": '4.5,
    //   "itemReviewed": {
    //     "@type": "Product",
    //     "name": title,
    //     "brand": "Midway"
    //   }
    // },
    // FIXME: If you have reviews modify this area
    // "review": {
    //   "@type": "Review",
    //   "reviewRating": {
    //     "@type": "Rating",
    //     "ratingValue": reviews && reviews.reviews[0] && reviews.reviews[0][0].node.score
    //   },
    //   "author": {
    //     "@type": "Person",
    //     "name": reviews && reviews.reviews[0] && reviews.reviews[0][0].node.name
    //   },
    //   "reviewBody": reviews && reviews.reviews[0] && reviews.reviews[0][0].node.content
    // }
  }
  return schema
}