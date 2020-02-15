export default {
  title: 'Page Content',
  name: 'pageModule',
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'content.main.title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    }
  ]
}
