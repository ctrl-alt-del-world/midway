const queries = require('../api/queries');
const sanity = require('../api/sanity');

//
// === Get Data ===
//

module.exports.getAllPageData = () => {
  // Fetch all data needs
  const productsQuery = sanity.fetch(queries.products)
  const pagesQuery = sanity.fetch(queries.pages);
  const collectionQuery = sanity.fetch(queries.collections);
  const globalQuery = sanity.fetch(queries.global);

  // Wait for all data needs
  return Promise.all([
    productsQuery,
    pagesQuery,
    collectionQuery,
    globalQuery
  ]);
};

//
// === Create All Pages ===
//

module.exports.createAllPages = (
  promiseResults,
  actions,
  resolve,
  reject
) => {
  const [
    products,
    pages,
    collections,
    global,
  ] = promiseResults;

  //
  // === Create Contexts ===
  //
  const sharedContext = {
    // menus,    Addd this pattern
    // siteGlobal
    site: global
  };

  //
  // === Create pages ===
  //

  try {

    // Collections 
    collections && collections.forEach(collection => {
      actions.createPage({
        path: `/collections/${collection.slug}`,
        component: require.resolve('../templates/collection.tsx'),
        context: {
          ...sharedContext,
          ...collection
        }
      })
    })



    // Pages
    pages && pages.forEach(page => {
      actions.createPage({
        path: `${page.slug === 'home' ? '/' : `/${page.slug}` }`,
        component: require.resolve('../templates/page.tsx'),
        context: {
          ...sharedContext,
          ...page,
        }
      });
    });

    // Products
    products && products.forEach(product => {
      actions.createPage({
        path: `/products/${product.slug}`,
        component: require.resolve('../templates/product.tsx'),
        context: {
          ...sharedContext,
          ...product,
        }
      });
    });

    // Accounts
    actions.createPage({
      path: '/account',
      matchPath: '/account',
      component: require.resolve('../templates/account.tsx'),
      context: {
        layout: 'account',
        ...sharedContext
      },
    })

    actions.createPage({
      path: '/account',
      matchPath: '/account/*',
      component: require.resolve('../templates/account.tsx'),
      context: {
        layout: 'account',
        ...sharedContext
      },
    })

    actions.createRedirect({
      fromPath: '/account*',
      toPath: '/account',
      statusCode: 200,
    })


    actions.createPage({
      path: '/404/',
      component: require.resolve('../templates/404.tsx'),
      context: {
        ...sharedContext
      },
    })

    //
    // === Redirects ===
    //
    // redirects.forEach(redirect => {
    //   actions.createRedirect({
    //     fromPath: redirect.fromPath,
    //     toPath: redirect.toPath,
    //     isPermanent: redirect.statusCode === 301, // use as fallback. this is part of Gatsby's API
    //     statusCode: redirect.statusCode || 302 // Netlify specific. Will override `isPermanent`
    //   });
    // });
    actions.createRedirect({
      fromPath: '/:accountId/orders/:orderId/authenticate key=:key',
      toPath:
        'https://shop.allkinds.com/:accountId/orders/:orderId/authenticate?key=:key',
      isPermanent: true,
      statusCode: 301,
    })
  } catch(error) {
    reject(error);
    return;
  }

  resolve();
};