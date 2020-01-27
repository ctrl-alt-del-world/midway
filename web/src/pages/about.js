import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout/Layout"
import Image from "../components/image"
import SEO from "../components/seo"

const About = () => {

  return ( 
    <Layout>
      <SEO 
        title="About"
        description="" />
      <main className='about'>
      
      </main>

    </Layout>
  )
  }

export default About
