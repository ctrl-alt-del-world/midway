export default {
  title: 'Nested Pages',
  name: 'nestedPages',
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'title',
      title: 'Title (Optional)',
      type: 'string'
    },
    {
      name: 'page',
      title: 'Page Items',
      type: 'array',
      of: [{ type: 'pageItem' }]
    },
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare (selection) {
      const { title } = selection
      return Object.assign({}, selection, {
        title: 'Nested Pages',
        subtitle: title && `of ${title}`
      })
    }
  }
}
