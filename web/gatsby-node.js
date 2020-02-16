
exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions

  const results = await graphql(`
    {
      allSanityPage {
        edges {
          node {
            _rawContent
          }
        }
      }
    }
  `)

  if (results.errors) {
    throw results.errors
  }

  const pages = results.data.allSanityPage.edges || []
  pages.forEach((edge, index) => {
    const path = `/${edge.node._rawContent.main.slug.current === 'home' ? '' : edge.node._rawContent.main.slug.current}`

    createPage({
      path,
      component: require.resolve('./src/templates/page.tsx'),
      context: {...edge.node._rawContent},
    })
  })
}