import cx from "classnames"
import { GatsbyImage } from "gatsby-plugin-image"
// @ts-ignore
import { getGatsbyImageData } from "gatsby-source-sanity"
import React, { useState, useEffect } from "react"

const sanityConfig = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET
}

export const Image = ({ imageId, className, width, alt, src }: {
  imageId?: string
  width?: number
  alt?: string
  className?: string
  src?: string
}) => {

  const [loaded, setLoaded] = useState(false)
  let fluidProps

  if (imageId && !/gif/.test(imageId)) {
    fluidProps = getGatsbyImageData(imageId, { maxWidth: width || 2400 }, sanityConfig)
  }

  return (
    <div className={cx("image__block ma", className)}>
      {fluidProps ? (
        <GatsbyImage image={fluidProps} alt={alt} />
      ) : (
          <img
            alt={alt}
            src={src ? src : undefined}
            className={cx("x y block", {
              "is-loaded": loaded,
            })}
            onLoad={() => {
              setLoaded(true)
            }} />
        )}
    </div>
  )
}
