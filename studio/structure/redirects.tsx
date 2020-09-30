import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import Emoji from 'a11y-react-emoji'

const Icon = () => <Emoji style={{ fontSize: '2rem' }} symbol='🔗' />

export const RedirectMenuItem = S.listItem()
  .title('Redirects')
  .icon(Icon)
  .child(
    S.documentTypeList('redirect')
      .title('Redirects')
      .menuItems(S.documentTypeList('redirect').getMenuItems())
      .filter('_type == $type')
      .params({ type: 'redirect' })
      .child(documentId =>
        S.document()
          .documentId(documentId)
        )
  );
