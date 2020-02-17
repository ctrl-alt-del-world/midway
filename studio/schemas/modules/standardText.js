export default {
  title: 'Standard Text',
  name: 'standardText',
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [
        {
          type: 'block'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: ''
    },
    prepare (selection) {
      return Object.assign({}, selection, {
        title: 'Standard Text'
      })
    }
  }
}
