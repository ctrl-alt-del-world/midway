import React from 'react'
import S from '@sanity/desk-tool/structure-builder'

import {
  ConfigMenu,
  ProductMenuItem,
  ProductVariantParent,
  CollectionMenuItem,
  PageMenuItem
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
    ])