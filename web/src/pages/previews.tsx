import React from "react"
import { Router } from "@reach/router"

import Page from "src/templates/page"
import Product from "src/templates/product"

import sanityClient  from "@sanity/client"

import {
  pageQuery,
  productQuery
} from "src/utils/queries"

// FIXME: why can't we access process env here again 🤔
const client = sanityClient({
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_PROJECTSET,
  useCdn: false, // `false` i,f you want to ensure fresh data
  withCredentials: true,
})

// FIXME: Update this component to be TS-y

class PreviewPage extends React.Component<
  { path: string; document?: Document },
  { document: null | Document; type: null | string; doc: any; loaded: boolean }
> {
  constructor(
    props: Readonly<{ path: string; document?: Document | undefined }>
  ) {
    super(props)
    this.state = {
      document: null,
      type: null,
      doc: {},
      loaded: false,
    }
  }

  public componentDidMount() {
    // @ts-ignore
    const queryDraft = `*[_id == "${this.props.document}"]  {
        ...,
      }`

    // @ts-ignore
    const queryPreviewPage = `*[_id == "${this.props.document}"]  {
        ${pageQuery}
      }`

    // @ts-ignore
    const queryPreviewProduct = `*[_id == "${this.props.document}"]  {
        ${productQuery}
      }`

    client
      .fetch(queryDraft)
      // @ts-ignore
      .then(response => {
        this.setState({
          type: response[0]._type,
        })
        switch (response[0]._type) {
          case "page":
            // @ts-ignore
            client.fetch(queryPreviewPage).then(res => {
              this.setState({
                doc: res[0],
                loaded: true,
              })
            })
            break
          case "product":
            // @ts-ignore
            client.fetch(queryPreviewProduct).then(res => {
              this.setState({
                doc: res[0],
                loaded: true,
              })
            })
            break
          default:
            return
        }
      })
      // @ts-ignore
      .catch(error => {
        console.log("problem", error)
      })
  }

  public renderPreview() {
    console.log('render preview', this.state.doc)
    // @ts-ignore
    if (this.state.loaded) {
      // @ts-ignore
      switch (this.state.type) {
        case "page":
          return <Page pageContext={this.state.doc.content} preview={true} />
        case "product":
          return <Product pageContext={this.state.doc.content} location={{search: ''}} preview={true} />
        case "post":
        default:
          break
      }
    }
  }

  public render() {
    return <div>{this.renderPreview()}</div>
  }
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
