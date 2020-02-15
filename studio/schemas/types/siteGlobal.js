import React from 'react'
import Emoji from 'a11y-react-emoji'

import Tabs from 'sanity-plugin-tabs'

const Icon = () => (<Emoji style={{ fontSize: '2rem' }} symbol='🌎' />)

export default {
  name: 'siteGlobal',
  _id: 'siteGlobal',
  title: 'Global',
  type: 'document',
  description: 'Handles general global settings',
  icon: Icon,
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
