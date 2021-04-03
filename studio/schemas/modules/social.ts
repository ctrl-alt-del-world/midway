export default {
  title: 'Social',
  name: 'social',
  type: 'object',
  fields: [
    {
      title: 'Social Links',
      name: 'socialLinks',
      type: 'array',
      of: [{ type: 'socialLink' }]
    }
  ]
}
