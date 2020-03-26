import React from 'react'
import { Modules } from "src/components/modules"

export const RenderModules = (modules: []) => {
  if (modules) {
    return modules.map((module: {
      _key: string,
      _type: string
    }) => {
      return (
        <React.Fragment 
        key={module._key}>
          {/* MIDWAY: This is just a helper, feel free to remove! */}
          <div className='p1'>
            <div className='module__type p05 mb1'>module type: {module._type}</div>
          </div>
          <Modules
            type={module._type}
            reactModule={module} />
        </React.Fragment>
      )
    })
  }
}