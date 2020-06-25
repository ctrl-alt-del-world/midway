const moduleQuery = `
  _type == 'nestedPages' => {
    ...,
    page[] {
      ...,
      linkedPage->
    }
  }
`

const pageQuery = `
  ...,
  content {
    ...,
    main {
      ...,
      modules[] {
        ...,
        ${moduleQuery}
      }
    }
  }
`

const productQuery = `
  ...,
  content {
    ...,
    main {
      ...,
      mainImage {
        asset-> {
          _id
        }
      }
    }
  }
`

module.exports = {
  pageQuery,
  productQuery
}