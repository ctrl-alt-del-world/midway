import React from "react"
import { Link } from 'gatsby'

import Layout from "../components/Layout/Layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div style={{
      textAlign : 'center',
      fontWeight : 'normal'
    }}>
					<h1 style={{ textTransform: "uppercase"}}>
						Not Found
					</h1>
          <p>Click <Link to={'/'} style={{color: 'inherit'}}>here</Link> to go home</p>
    </div>
  </Layout>
)

export default NotFoundPage
