import React, { useState, useEffect, useCallback} from "react"
import { Router } from "@reach/router"

import { useLoads } from 'react-loads'

import Page from "src/templates/page"
import Product from "src/templates/product"

import sanityClient from 'src/api/sanity'

import {
  pageQuery,
  productQuery
} from "src/api/queries"


const PreviewPage = ({ document }: { document: string }) => {
  const [doc, setDoc] = useState(null as any)

  
  //  @ts-ignore
  const queryDraft = `*[_id == "${document}"]  {
    ...,
  }`

  // @ts-ignore
  const queryPreviewPage = `*[_id == "${document}"]  {
    ${pageQuery}
  }`

  // @ts-ignore
  const queryPreviewProduct = `*[_id == "${document}"]  {
    ${productQuery}
  }`

  const handlePreviewFetch = useCallback(
    () => 
      sanityClient
        .fetch(queryDraft)
        .then((response: any) => {
          switch (response[0]._type) {
            case 'page':
              sanityClient.fetch(queryPreviewPage).then(res => {
                setDoc(res[0])
              })
              break
            case 'product':
              sanityClient.fetch(queryPreviewProduct).then(res => {
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
        case 'page': return <Page pageContext={doc} preview={true} />
        case 'product': return <Product pageContext={doc} preview={true} />
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


const Previews = () => {
  return (
    <div>
      <Router>
        <PreviewPage path="/previews/:document" />
      </Router>
    </div>
  )
}

export default Previews
