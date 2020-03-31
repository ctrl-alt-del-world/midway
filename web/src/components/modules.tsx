import React from 'react'

import { StandardText, StandardTextProps } from 'src/components/global/standardText'
import { ProductGrid, ProductGridProps } from 'src/components/global/productGrid'
import { NestedPages, NestedPagesProps } from 'src/components/global/nestedPages'


export const Modules = ({ reactModule, type }: { type: string, reactModule: any }) => {
  switch(type) {
    case 'standardText':
      return <StandardText data={reactModule as StandardTextProps["data"]} />
      case 'productGrid':
        return <ProductGrid data={reactModule as ProductGridProps["data"]} />
      case 'nestedPages':
        return <NestedPages data={reactModule as NestedPagesProps["data"]} />
    default:
      return (<span>{type}</span>)
  }
}