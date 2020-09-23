import React from 'react'
import S from '@sanity/desk-tool/structure-builder'

import {
  ConfigMenu,
  ProductMenuItem,
  ProductVariantParent,
  CollectionMenuItem,
  SubscriptionMenuItem,
  RedirectMenuItem,
  PageMenuItem,
  DocMenuItem
} from './structure/index'

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