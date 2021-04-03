import React from "react"
import Helmet from "react-helmet"

const siteRoute = "https://midway-starter.netlify.com"

interface MetaInformation {
  metaTitle?: string
  metaDescription?: string
  openImage?: string
  twitterImage?: string
  twitterTitle?: string
  openTitle?: string
  openGraphDescription?: string
  twitterDescription?: string
}

export const SEO = ({
  defaultMeta,
  defaultTitle,
  pagePath,
  metaInfo,
}: {
  pagePath: string
  metaInfo: MetaInformation,
  defaultMeta: MetaInformation,
  defaultTitle: string
}) => {
  const title = metaInfo
    ? metaInfo.metaTitle
      ? metaInfo.metaTitle
      : defaultTitle
    : defaultTitle ? defaultTitle : defaultMeta && defaultMeta.metaTitle
    const metaDescription = metaInfo
    ? metaInfo.metaDescription
      ? metaInfo.metaDescription
      : defaultMeta.metaDescription
    : defaultMeta.metaDescription
  const metaKeywords = defaultMeta.metaKeywords
  const ogImage = metaInfo
    ? metaInfo.openImage
      ? metaInfo.openImage
      : defaultMeta.openImage
    : defaultMeta.openImage
  const twitterImage = metaInfo
    ? metaInfo.twitterImage
      ? metaInfo.twitterImage
      : defaultMeta.twitterImage
    : defaultMeta.twitterImage
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
