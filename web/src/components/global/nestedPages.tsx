import React from "react"
import { PageLink } from 'src/components/link'

export interface NestedPagesProps {
  data: {
    title: string
    page: Array<{
      _key: string
      description?: string
      title: string
      linkedPage: {
        content: {
          main: {
            slug: {
              current: string
            }
          }
        }
      }
    }>
  }
}

const NestedPages = ({ data }: NestedPagesProps) => {
  const { page } = data
  return (
    <div className="container--xl outer mxa py2 p1 al p x">
      <h5 className='caps ls1'>{data.title}</h5>
      <div className='df fw row'>
        {page.map(({ title, _key, description, linkedPage }) => (
          <div key={_key} className='x col c12 c6--600 mt1 mb1 doc__block'>
            <PageLink className='db ba p1 y' to={`/${linkedPage.content.main.slug.current}/`}>
              <h3 className='m0 p0 cb no-underline'>{title} ➔ </h3>
              <p className='cb no-underline'>{description}</p>
            </PageLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NestedPages