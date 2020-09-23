export default {
  title: 'Product Content',
  name: 'productModule',
  type: 'object',
  fieldsets: [
    {
      name: 'modules',
      title: 'Product Modules',
      options: {
        collapsible: true,
        collapsed: true
      }
    },
    {
      name: 'main',
      title: 'Product Main Content',
      options: {
        collapsible: true,
        collapsed: true
      }
    }
  ],
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
      readOnly: true,
      description: 'This has to stay in sync with Shopify',
      options: {
        source: 'content.main.title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'linkedSite',
      title: 'Linked Site Url',
      description: 'This is a fake product so link to the real site!',
      type: 'url'
    },
    {
      name: 'linkedSiteName',
      title: 'Linked Site Name',
      description: 'Linked Site Title',
      type: 'string'
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true
      },
      fieldset: 'main',
      validation: Rule => Rule.required()
    },
    {
      name: 'productDescription',
      title: 'Product Description',
      type: 'blockContent',
      fieldset: 'main'
    },
    {
      name: 'modules',
      title: 'Modules',
      type: 'moduleContent',
      fieldset: 'modules'
    }
  ]
}
