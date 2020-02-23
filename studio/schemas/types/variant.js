export default {
  name: 'productVariant',
  title: 'Variant',
  type: 'document',
  __experimental_actions: ['update', 'publish', 'delete'],
  fields: [
    {
      name: "content",
      type: "variantContent"
    }
  ],
  preview: {
    select: {
      title: 'content.main.title',
      media: 'mainImage'
    }
  }
}
