import React, { useState, useEffect, useCallback} from "react"
import { Router } from "@reach/router"

import { useLoads } from 'react-loads'

import Documentation from "src/templates/documentation"

import sanityClient  from "@sanity/client"

import {
  pageQuery
} from "src/utils/queries"

const client = sanityClient({
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
  useCdn: false, 
  withCredentials: true,
})

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
      client
        .fetch(queryDraft)
        .then((response: any) => {
          switch (response[0]._type) {
            case 'doc':
              client.fetch(queryPreviewDocs).then(res => {
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
      {console.log('nothing?', doc)}
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
