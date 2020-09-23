
exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions

  // Handle Redirects
  const redirectsQuery = await graphql(`
    {
      allSanityRedirect {
        edges {
          node {
            id
            fromPath
            statusCode
            toPath
          }
        }
      }
    }
  `)

  if (redirectsQuery.errors) {
    throw redirectsQuery.errors
  }

  //
  // === Redirects ===
  //
  const redirects = redirectsQuery.data.allSanityRedirect.edges || []
  redirects.forEach(redirect => {
    const {
      fromPath,
      toPath,
      statusCode
    } = redirect.node
    actions.createRedirect({
      fromPath: fromPath,
      toPath: toPath,
      isPermanent: statusCode === 301, // use as fallback. this is part of Gatsby's API
      statusCode: statusCode || 302 // Netlify specific. Will override `isPermanent`
    });
  });

  // Query Pages
  const pagesQuery = await graphql(`
    {
      allSanityPage {
        edges {
          node {
            _rawContent(resolveReferences: {maxDepth: 9})
          }
        }
      }
    }
  `)

  if (pagesQuery.errors) {
    throw pagesQuery.errors
  }

  const pages = pagesQuery.data.allSanityPage.edges || []
  pages.forEach((edge, index) => {
    const path = `/${edge.node._rawContent.main.slug.current === 'home' ? '' : edge.node._rawContent.main.slug.current}`

    createPage({
      path,
      component: require.resolve('./src/templates/page.tsx'),
      context: {...edge.node._rawContent},
    })
  })

  // Query Products
  const productsQuery = await graphql(`
  {
    allSanityProduct {
      edges {
        node {
          _rawContent(resolveReferences: {maxDepth: 9})
        }
      }
    }
  }
`)

  if (productsQuery.errors) {
    throw productsQuery.errors
  }

  const products = productsQuery.data.allSanityProduct.edges || []
  products.forEach((edge, index) => {
  const path = `/products/${edge.node._rawContent.main.slug.current}`

    createPage({
      path,
      component: require.resolve('./src/templates/product.tsx'),
      context: {...edge.node._rawContent},
    })
  })

  // Query Collections
  const collectionsQuery = await graphql(`
  {
    allSanityCollection {
      edges {
        node {
          _rawContent(resolveReferences: {maxDepth: 9})
        }
      }
    }
  }
`)

  if (collectionsQuery.errors) {
    throw collectionsQuery.errors
  }

  const collections = collectionsQuery.data.allSanityCollection.edges || []
  collections.forEach((edge, index) => {
    const path = `/collection/${edge.node._rawContent.main.slug.current}`

    createPage({
      path,
      component: require.resolve('./src/templates/page.tsx'),
      context: {...edge.node._rawContent},
    })
  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions
  if (page.path.startsWith('/docs')) {
    page.context.layout = 'docs'
    createPage(page)
  }

  if (page.path.startsWith('/account')) {
    page.context.layout = 'accounts'
    createPage(page)
  }
}