import React, { useState, useEffect, useCallback} from "react"
import { Router } from "@reach/router"

import { useLoads } from 'react-loads'

import Documentation from "src/templates/documentation"

import { sanityClient } from 'src/api/sanity'

import {
  pageQuery
} from "src/api/queries"


const PreviewPage = ({ document }: { document: string }) => {
  const [doc, setDoc] = useState(null as any)

  
  //  @ts-ignore
  const queryDraft = `*[_id == "${document}"]  {
    ...,
  }`

  // @ts-ignore
  const queryPreviewDocs= `*[_id == "${document}"]  {
    ${pageQuery}
  }`

  const handlePreviewFetch = useCallback(
    () => 
      sanityClient
        .fetch(queryDraft)
        .then((response: any) => {
          switch (response[0]._type) {
            case 'doc':
              sanityClient.fetch(queryPreviewDocs).then(res => {
                setDoc(res[0])
              })
              break
            default:
              break
          }
        }),
      []
  )

  const { error, isResolved, isPending, isReloading, load } = useLoads(
    'handlePreviewFetch',
    handlePreviewFetch as any,
    {
      defer: true,
    }
  )

  useEffect(() => {
    load()
  }, [0])

  const renderPreview = () => {
    if (doc) {
      switch (doc._type) {
        case 'doc': return <Documentation pageContext={doc.content} preview={true} />
        default: break
      }
    }
  }
  return (
    <>
      {(isPending ||
        isReloading) && (
        <div className='ac'><span>Loading</span></div>
      )}
      {isResolved && !isPending && renderPreview()}
    </>
  )
}


const Docs = () => {
  return (
    <div>
      <Router>
        <PreviewPage path="/docs/:document" />
      </Router>
    </div>
  )
}

export default Docs
