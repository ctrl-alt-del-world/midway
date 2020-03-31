import React from "react"
import Helmet from "react-helmet"

const siteRoute = "https://midway-starter.netlify.com"

export const SEO = ({
  pagePath,
  metaInfo,
}: {
  pagePath: string
  metaInfo: {
    metaTitle?: string
    metaDescription?: string
    openImageUrl?: string
    twitterImageUrl?: string
    twitterTitle?: string
    openTitle?: string
    openGraphDescription?: string
    twitterDescription?: string
  }
}) => {
  const title = metaInfo
    ? metaInfo.metaTitle
      ? metaInfo.metaTitle
      : "Midway"
    : "Midway"
  const metaDescription = metaInfo
    ? metaInfo.metaDescription
      ? metaInfo.metaDescription
      : "Midway is an Open source Headless  Shopify + Sanity starter."
    : "Midway is an Open source Headless  Shopify + Sanity starter."
  const metaKeywords = "midway, sanity, shopify, graphql, starter"
  const ogImage = metaInfo
    ? metaInfo.openImageUrl
      ? metaInfo.openImageUrl
      : ""
    : ""
  const twitterImage = metaInfo
    ? metaInfo.twitterImageUrl
      ? metaInfo.twitterImageUrl
      : ""
    : ""
  const openTitle = metaInfo
    ? metaInfo.openTitle
      ? metaInfo.openTitle
      : title
    : title
  const openGraphDescription = metaInfo
    ? metaInfo.openGraphDescription
      ? metaInfo.openGraphDescription
      : metaDescription
    : metaDescription
  const twitterTitle = metaInfo
    ? metaInfo.twitterTitle
      ? metaInfo.twitterTitle
      : title
    : title
  const twitterDescription = metaInfo
    ? metaInfo.twitterDescription
      ? metaInfo.twitterDescription
      : metaDescription
    : metaDescription
  return (
    <Helmet title={title}>
      <html lang="en" />
      <meta http-equiv="Accept-CH" content="DPR, Width, Viewport-Width" />
      <meta property="og:locale" content="en_US" />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta
        property="og:url"
        content={`${siteRoute}/${pagePath ? pagePath : ""}`}
      />
      <meta property="og:image" content={ogImage} />
      <meta property="og:title" content={`${openTitle}`} />
      <meta property="og:site_name" content="Midway" />
      <meta property="og:description" content={openGraphDescription} />
      <meta name="twitter:site" content="@Midway" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${twitterTitle}`} />
      <meta name="twitter:image:src" content={twitterImage} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta
        name="twitter:url"
        content={`${siteRoute}/${pagePath ? pagePath : ""}`}
      />
    </Helmet>
  )
}
