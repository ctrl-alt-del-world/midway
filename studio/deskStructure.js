import S from '@sanity/desk-tool/structure-builder'
import { MdSettings, MdDvr } from 'react-icons/md'
import { GiShoppingCart } from 'react-icons/gi'

const hiddenTypes = [ 'product', 'productVariant', 'page', 'post', 'siteSettings']

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
        .icon(MdSettings),
      S.listItem()
        .title('Posts')
        .child(
          S.editor()
            .id('post')
            .schemaType('post')
            .child(S.documentTypeList('post').title('Posts'))
        )
        .icon(MdDvr),
      S.listItem()
        .title('Products')
        .schemaType('product')
        .child(S.documentTypeList('product').title('Products'))
        .icon(GiShoppingCart),
      ...S.documentTypeListItems().filter(listItem => !hiddenTypes.includes(listItem.getId()))
    ])
