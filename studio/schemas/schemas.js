// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './blockContent'
import blockText from './blockText'
import siteSettings from './siteSettings'

// Content Types
import product from './types/product'
import page from './types/page'
import global from './types/global'
import menus from './types/menus'
import post from './types/post'
import variant from './types/variant'

// Modules
import externalLink from './modules/externalLink'
import internalLink from './modules/internalLink'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    siteSettings,
    global,
    page,
    post,
    menus,
    product,
    variant,
    // Modules
    externalLink,
    internalLink,
    blockContent,
    blockText,

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ])
})
