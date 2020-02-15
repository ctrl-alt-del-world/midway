import React from 'react'
import Emoji from 'a11y-react-emoji'

import Tabs from 'sanity-plugin-tabs'

const Icon = () => (<Emoji style={{ fontSize: '2rem' }} symbol='🌎' />)

export default {
  name: 'global',
  _id: 'global',
  title: 'Global',
  type: 'document',
  description: 'Handles general global settings',
  icon: Icon,
  fields: [
    {
      name: "content",
      type: "object",
      inputComponent: Tabs,
      fieldsets: [
        { name: "defaultMeta", title: "Meta" },
        { name: "social", title: "Social" }
      ],
      fields: [
        {
          type: "object",
          name: "metaInformation",
          description: "Handles the default meta information for all content types",
          fieldset: "defaultMeta",
          fields: [
            {
              type: "metaCard",
              name: "content"
            }
          ]
        },
        {
          type: "object",
          name: "socail",
          description: "Handles the default meta information for all content types",
          fieldset: "social",
          fields: [
            {
              name: 'twitter',
              type: 'url',
              title: 'Twitter URL'
            },
            {
              name: 'instagram',
              type: 'url',
              title: 'Instagram URL'
            },
            {
              name: 'facebook',
              type: 'url',
              title: 'Facebook URL'
            }
          ]
        }
      ]
    }
    // {
    //   name: 'newsletterTitle',
    //   title: 'Newsletter Title',
		// 	type: 'array',
		// 	of: [
		// 		{
		// 			type: 'block',
		// 			marks: {
		// 				decorators: [
    //           {
    //             title: 'Serif',
    //             value: 'serif',
    //             blockEditor: {
    //               icon: () => 'S',
    //               render: (props) => (
    //                 <span style={{ fontFamily: 'serif', fontWeight: '300' }}>{props.children}</span>
    //               )
    //             }
    //           }
		// 				]
		// 			},
		// 			of: [ { type: 'image' } ]
		// 		}
    //   ],
    //   fieldset: 'newsletter'
    // },
    // {
    //   name: 'newsletterDescription',
    //   title: 'Newsletter Description',
    //   type: 'text',
    //   rows: 2,
    //   fieldset: 'newsletter'
    // },
    // {
    //   name: 'twitter',
    //   type: 'url',
    //   title: 'Twitter URL',
    //   fieldset: 'social'
    // },
    // {
    //   name: 'instagram',
    //   type: 'url',
    //   title: 'Instagram URL',
    //   fieldset: 'social'
    // }
  ],
  preview: {
    select: {},
    prepare() {
      return Object.assign({}, {
        title: 'Footer'
      })
    }
  }
}
