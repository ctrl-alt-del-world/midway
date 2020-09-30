import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import Emoji from 'a11y-react-emoji'

const Icon = () => <Emoji style={{ fontSize: '2rem' }} symbol='📫' />

export const SubscriptionMenuItem = S.listItem()
  .title('Subscriptions')
  .icon(Icon)
  .child(
    S.documentTypeList('subscription')
      .title('Subscriptions')
      .menuItems(S.documentTypeList('subscription').getMenuItems())
      .params({ type: 'subscription' })
  );
