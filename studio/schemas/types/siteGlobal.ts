import React from 'react'
import Emoji from 'a11y-react-emoji'

import Tabs from 'sanity-plugin-tabs'

export default {
  name: 'siteGlobal',
  _id: 'siteGlobal',
  title: 'Global',
  type: 'document',
  description: 'Handles general global settings',
  fields: [
    {
      name: "content",
      type: "globalContent",
    }
  ],
  preview: {
    select: {},
    prepare() {
      return Object.assign({}, {
        title: 'Global Settings'
      })
    }
  }
}
