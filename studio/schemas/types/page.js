import Tabs from 'sanity-plugin-tabs'

export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  liveEdit: false,
  // You probably want to uncomment the next line once you've made the pages documents in the Studio. This will remove the pages document type from the create-menus.
  // __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  fields: [
    {
      name: "content",
      type: "object",
      inputComponent: Tabs,
      fieldsets: [
        { name: "main", title: "Main" },
        { name: "defaultMeta", title: "Meta" }
      ],
      fields: [
        {
          type: "object",
          name: "main",
          description: "Handles page content",
          fieldset: "main",
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
        },
        {
          type: "object",
          name: "meta",
          fieldset: "defaultMeta",
          fields: [
            {
              name: "content",
              type: "metaCard"
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'content.main.title',
      subtitle: 'heroText',
      media: 'mainImage'
    }
  }
}
