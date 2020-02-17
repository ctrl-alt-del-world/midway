import React from 'react'

import { StandardText, StandardTextProps } from 'src/components/global/standardText'

export const Modules = ({ reactModule, type }: { type: string, reactModule: any }) => {
  switch(type) {
    case 'standardText':
      return <StandardText data={reactModule as StandardTextProps["data"]} />
    default:
      return (<span>{type}</span>)
  }
}