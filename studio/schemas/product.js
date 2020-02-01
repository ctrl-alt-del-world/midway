export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      description: 'This comes from Shopify and cannot be changed',
      readOnly: true,
      hidden: true
    },
    {
      name: 'deleted',
      title: 'Deleted',
      type: 'boolean',
      description: 'This can be a flag set if the item is deleted from Shopify'
    },
    {
      name: 'productId',
      title: 'Product ID',
      type: 'string',
      description: 'This comes from Shopify and cannot be changed',
      readOnly: true,
      hidden: true
    },
    {
      name: 'defaultPrice',
      title: 'Default Price',
      type: 'string',
      description: 'This comes from Shopify and cannot be changed',
      readOnly: true
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'This comes from Shopify and cannot be changed',
      readOnly: true,
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'productDescription',
      title: 'Product Description',
      type: 'blockContent'
    },
    {
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'productVariant' } }]
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage'
    }
  }
}
