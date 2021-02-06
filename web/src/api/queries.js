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
  ...,
  'modules': content.main.modules[] {
    ...,
    ${moduleQuery}
  },
`

const productQuery = groq`
  ${slugQuery},
  ...,
  'modules': content.main.modules[] {
    ...,
    ${moduleQuery}
  },
  'main': content.main {
    ...,
    mainImage {
      asset-> {
        _id
      }
    }
  }
`
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