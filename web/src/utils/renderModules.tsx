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
          <Modules
            reactModule={module} />
        </React.Fragment>
      )
    })
  }
}