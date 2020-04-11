import cx from "classnames"
import Img from "gatsby-image"
// @ts-ignore
import { getFluidGatsbyImage } from "gatsby-source-sanity"
import React, { useState, useEffect } from "react"

const {
  GATSBY_SANTITY_PROJECT_ID,
  GATSBY_SANITY_PROJECTSET
} = process.env

console.log(process.env)

const sanityConfig = { projectId: GATSBY_SANTITY_PROJECT_ID, dataset: GATSBY_SANITY_PROJECTSET }

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
    fluidProps = getFluidGatsbyImage(imageId, { maxWidth: width || 2400 }, sanityConfig)
  }

  return (
    <div className={cx("image__block ma", className)}>
      {fluidProps ? (
        <Img fluid={fluidProps} alt={alt} defaultFadeIn={700} />
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
