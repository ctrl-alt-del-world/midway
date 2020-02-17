import React from "react"

export const Serializer = {
  marks: {
    catName: (props: {
      children: any
      props: {
        children: string
      } }) => (
      <span className='sans-b block bold h2'>{props.children}</span>
    ),
    serif: (props: {
      children: any
    }) => (
      <span className='cooper'>{props.children}</span>
    )
  },
  // types: {
  //   inlineIcon: props => (
  //     <img className="inline-block inline__icon" src={props.node.image} />
  //   )
  // }
}
