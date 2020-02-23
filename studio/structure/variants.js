import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import Emoji from 'a11y-react-emoji'

const VariantIcon = () => <Emoji style={{ fontSize: '2rem' }} symbol='🥘' />

export const ProductVariantParent = S.listItem()
.title('Product Variants')
.icon(VariantIcon)
.child(
  S.documentTypeList('product')
    .title('By Product')
    .menuItems(S.documentTypeList('product').getMenuItems())
    .filter('_type == $type && !defined(parents) && subscription != true')
    .params({ type: 'product' })
    .child(productId =>
      S.documentList()
        .title('Variants')
        .menuItems(S.documentTypeList('productVariant').getMenuItems())
        .filter('_type == $type && content.shopify.productId == $productId')
        .params({ type: 'productVariant', productId: Number(productId) })
    )
);
