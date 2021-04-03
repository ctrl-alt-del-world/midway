const groq = require('groq')

const slugQuery = groq`
  'slug': content.main.slug.current
`

const asset = groq`{
  _type,
  _key,
  alt,
  caption,
  '_id': image.asset->_id,
  'dimensions': image.asset->metadata.dimensions,
  'url': image.asset->url,
}`

const SEOQuery = groq`
  _type,
  metaKeywords,
  metaDescription,
  metaTitle,
  openGraphDescription,
  'openImage': openImage.asset->url,
  openTitle,
  twitterTitle,
  twitterDescription,
  'twitterImage': twitterImage.asset->url
`

const moduleQuery = groq`
  _type == 'nestedPages' => {
    ...,
    page[] {
      ...,
      linkedPage->
    }
  },
  _type == 'productGrid' => {
    ...,
    products[]-> {
      ...,
    }
  }
`

const pageQuery = groq`
  ${slugQuery},
  'title': content.main.title,
  ...,
  'meta': content.meta {
    ${SEOQuery}
  },
  'modules': content.main.modules[] {
    ...,
    ${moduleQuery}
  },
`

const productQuery = groq`
  ${slugQuery},
  'title': content.main.title,
  ...,
  'meta': content.meta {
    ${SEOQuery}
  },
  'modules': content.main.modules[] {
    ...,
    ${moduleQuery}
  },
  'shopify': content.shopify,
  'main': content.main {
    ...,
    mainImage {
      asset-> {
        _id
      }
    }
  }
`
module.exports.global = groq`*[_type == "siteGlobal"][0] {
  ...,
  'defaultMeta': content.meta {
    ${SEOQuery}
  },
  'social': content.social.socialLinks
}`

module.exports.collections = groq`*[_type == "collection"] {
  ${pageQuery}
}`
module.exports.pages = groq`*[_type == "page"] {
  ${pageQuery}
}`

module.exports.products = groq`*[_type == "product"]{
  ${productQuery}
}`


module.exports.pageQuery = pageQuery 
module.exports.productQuery = productQuery