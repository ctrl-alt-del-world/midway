import React, { useEffect } from 'react'
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/github.css'

const CodeSnippet = ({ code }: { code: [] }) => {
  useEffect(() => {
    hljs.registerLanguage('javascript', javascript)
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    })
  })
  return (
    <pre>
      <code>{code}</code>
    </pre>
  )
}

export const Serializer = {
  marks: {
    tick: (props: {
      children: any
    }) => (
      <span className='tick'>{props.children}</span>
    ),
    italic: (props: {
      children: any
    }) => (
      <span className='italic'>{props.children}</span>
    ),
    code: (props: {
      children: any
    }) => (
      <CodeSnippet code={props.children} />
    )
  }
}
