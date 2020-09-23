export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  __experimental_actions: ['update', 'publish', 'delete'],
  fields: [
    {
      name: "content",
      type: "productContent"
    }
  ],
  preview: {
    select: {
      title: 'content.main.title',
      media: 'content.main.mainImage'
    }
  }
}
