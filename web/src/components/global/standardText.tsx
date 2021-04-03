import React from "react"

import BlockContent from "@sanity/block-content-to-react"

import { Serializer } from "src/utils/serializer"

export interface StandardTextProps {
  data: {
    text: any[]
  }
}

const StandardText = ({ data }: StandardTextProps) => {
  const { text } = data
  return (
    <div className="container--xl outer mxa py2 p1 al p x">
      <BlockContent blocks={text} serializers={Serializer} />
    </div>
  )
}

export default StandardText