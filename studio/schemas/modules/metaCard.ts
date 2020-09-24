export default {
  title: 'Meta Information',
  name: 'metaCard',
  type: 'object',
  fieldsets: [
    {
      name: 'opengraph',
      title: 'Open Graph Protocol',
      options: {
        collapsible: true,
        collapsed: true
      }
    },
    {
      name: 'twitter',
      title: 'Twitter Protocol',
      options: {
        collapsible: true,
        collapsed: true
      }
    }
  ],
  fields: [
    {
      name: 'metaKeywords',
      title: 'Meta Keywords',
      type: 'string'
    },
    {
      name: 'metaTitle',
      title: 'Meta Title (overrides default title)',
      type: 'string'
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'string'
    },
    {
      name: 'openImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Ideal size for open graph images is 1200 x 600',
      options: {
        hotspot: true
      },
      fieldset: 'opengraph'
    },
    {
      name: 'openTitle',
      title: 'Open Graph Title',
      type: 'string',
      fieldset: 'opengraph'
    },
    {
      name: 'openGraphDescription',
      title: 'Open Graph Description',
      type: 'text',
      fieldset: 'opengraph'
    },
    {
      name: 'twitterImage',
      title: 'Twitter Image',
      type: 'image',
      description: 'Ideal size for twitter images is 800 x 418',
      fieldset: 'twitter',
      options: {
        hotspot: true
      }
    },
    {
      name: 'twitterTitle',
      title: 'Twitter Card Title',
      type: 'string',
      fieldset: 'twitter'
    },
    {
      name: 'twitterDescription',
      title: 'Twitter Description',
      type: 'text',
      fieldset: 'twitter'
    }
  ]
}
