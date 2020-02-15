export default {
  title: 'External Link',
  name: 'externalLink',
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
      type: 'string',
      description: 'There is no `link` validation on this so please type accurate urls with https://, mailto:, tel: etc.'
    }
  ]
}
