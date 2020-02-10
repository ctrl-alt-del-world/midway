import S from '@sanity/desk-tool/structure-builder'
import React from 'react'

const hiddenTypes = ['product', 'productVariant', 'page', 'post', 'siteSettings']

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        )
        .icon(() => <span style={{ fontSize: '1.6rem' }} role='img'>🌐</span>),
      S.listItem()
        .title('Posts')
        .schemaType('post')
        .child(S.documentTypeList('post').title('Posts'))
        .icon(() => <span style={{ fontSize: '1.6rem' }} role='img'>📄</span>),
      S.listItem()
        .title('Products')
        .schemaType('product')
        .child(S.documentTypeList('product').title('Products'))
        .icon(() => <span style={{ fontSize: '1.6rem' }} role='img'>🛍 </span>),
      ...S.documentTypeListItems().filter(listItem => !hiddenTypes.includes(listItem.getId()))
    ])
