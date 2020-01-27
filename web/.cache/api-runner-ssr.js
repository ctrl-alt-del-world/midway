var plugins = [{
      plugin: require('/Users/lucasvocos/Code/gatsby-sanity/web/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/lucasvocos/Code/gatsby-sanity/web/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"gatsby-starter-default","short_name":"starter","start_url":"/","background_color":"#663399","theme_color":"#663399","display":"minimal-ui","icon":"src/images/favicon/apple-icon.png"},
    },{
      plugin: require('/Users/lucasvocos/Code/gatsby-sanity/web/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"k5euy0xb","dataset":"production","token":"skDAdjfwde6lsm3pHThJ22dRLHRZV5Q8pui4QYyx6kyHYCy4EX0wStRTwcED86tuLRgrWHe5j6wCOh1OAHvDf7FWBCOdmi78ohGQNPplyV9utIiYyJ1lO0MKxsqFc5rZ7tVKUpFwwwcE0edRIWHgsrPjhMT2L1hEPQJHnKg51HjoPZW7doFa"},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
