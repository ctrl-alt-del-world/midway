import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import Emoji from 'a11y-react-emoji'

import { Views } from './views/preview'

const Icon = () => <Emoji style={{ fontSize: '2rem' }} symbol='🛍️' />

export const ProductMenuItem = S.listItem()
  .title('Products')
  .icon(Icon)
  .child(
    S.documentTypeList('product')
      .title('Products')
      .menuItems(S.documentTypeList('product').getMenuItems())
      .filter('_type == $type && subscription != true')
      .params({ type: 'product' })
      .child(documentId =>
        S.document()
          .documentId(documentId)
          .views(Views({type: 'page'}))
        )
  );
