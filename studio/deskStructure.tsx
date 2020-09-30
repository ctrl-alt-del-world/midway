import React from 'react'
import S from '@sanity/desk-tool/structure-builder'

import { ConfigMenu } from './structure/config'
import { ProductMenuItem } from './structure/products'
import { ProductVariantParent } from './structure/variants'
import { CollectionMenuItem } from './structure/collections'
import { PageMenuItem } from './structure/pages'
import { DocMenuItem } from './structure/docs'
import { RedirectMenuItem } from './structure/redirects'
import { SubscriptionMenuItem } from './structure/subscriptions'

//
// === Structure ===
//

export default () =>
  S.list()
    .title('Content')
    .items([
      ConfigMenu,
      PageMenuItem,
      CollectionMenuItem,
      ProductMenuItem,
      ProductVariantParent,
      SubscriptionMenuItem,
      RedirectMenuItem,
      DocMenuItem
    ])