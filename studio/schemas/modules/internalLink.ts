export default {
  title: 'Internal Link',
  name: 'internalLink',
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'title',
      title: 'Link CTA',
      type: 'string'
    },
    {
      name: 'link',
      title: 'Link',
      type: 'reference',
      to: [
        { type: 'page' },
        { type: 'product' }
      ]
    }
  ]
}
