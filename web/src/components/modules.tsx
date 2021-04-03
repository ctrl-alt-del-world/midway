import React from 'react'
import loadable from '@loadable/component'

const StandardText = loadable(() => import('src/components/global/standardText'))
const ProductGrid = loadable(() => import('src/components/global/productGrid'))
const NestedPages = loadable(() => import('src/components/global/nestedPages'))

export const Modules = ({ reactModule }: { reactModule: any}) => getModule(reactModule)

const getModule = (module: any) => {
  const type = module._type
  const modules = {
    'standardText':  StandardText,
    'productGrid':  ProductGrid,
    'nestedPages': NestedPages,
    'default': () => <span className='h1'>{type}</span>
  }
  /* tslint:disable:no-string-literal */
  const Module = modules[type] || modules["default"];
  /* tslint:enable:no-string-literal */
  return <Module data={module} />;
}