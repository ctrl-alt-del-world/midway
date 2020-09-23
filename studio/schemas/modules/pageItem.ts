export default {
  title: 'Page Item',
  name: 'pageItem',
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'linkedPage',
      title: 'Linked Page',
      type: 'reference',
      to: [
        { type: 'page' }
      ]
    }
  ]
}
