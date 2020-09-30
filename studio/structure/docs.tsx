import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import Emoji from 'a11y-react-emoji'

import { DocViews } from './views/docPreview'

const Icon = () => <Emoji style={{ fontSize: '2rem' }} symbol='📄' />

export const DocMenuItem = S.listItem()
  .title('Docs')
  .icon(Icon)
  .child(
    S.documentTypeList('doc')
      .title('Docs')
      .menuItems(S.documentTypeList('doc').getMenuItems())
      .filter('_type == $type')
      .params({ type: 'doc' })
      .child(documentId =>
        S.document()
          .views(DocViews({type: 'doc'}))
          .documentId(documentId)
        )
  );
