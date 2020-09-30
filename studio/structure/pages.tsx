import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import Emoji from 'a11y-react-emoji'

import { Views } from './views/preview'

const Icon = () => <Emoji style={{ fontSize: '2rem' }} symbol='📄' />

export const PageMenuItem = S.listItem()
  .title('Pages')
  .icon(Icon)
  .child(
    S.documentTypeList('page')
      .title('Pages')
      .menuItems(S.documentTypeList('page').getMenuItems())
      .filter('_type == $type')
      .params({ type: 'page' })
      .child(documentId =>
        S.document()
          .documentId(documentId)
          .views(Views({type: 'page'}))
        )
  );
