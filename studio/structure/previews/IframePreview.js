/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './IframePreview.css'

const assembleProjectUrl = ({displayed, draft, options}) => {
  const {content: {main: {slug}}} = displayed
  const {previewURL} = options
  if (!slug || !previewURL) {
    console.warn('Missing slug or previewURL', {slug, previewURL})
    return ''
  }
  return `${previewURL}/${draft ? draft._id : displayed._id}`
}

class IframePreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: null,
      changing: false
    }
  }
  static propTypes = {
    document: PropTypes.object // eslint-disable-line react/forbid-prop-types
  }

  static defaultProps = {
    document: null
  }

  componentDidMount() {
    const {options} = this.props
    const {displayed, draft} = this.props.document
    console.log('build the url', assembleProjectUrl({displayed, draft, options}))
     this.setState({
       url: assembleProjectUrl({displayed, draft, options})
     })
  }

  componentDidUpdate(prevProps) {
    const {options} = this.props
    const {displayed, draft} = this.props.document
    if (prevProps.document.draft !== null && this.props.document.draft) {
      if (this.props.document.draft._updatedAt !== prevProps.document.draft._updatedAt) {
        this.setState({
          url: assembleProjectUrl({displayed, draft, options}),
          changing: true
        })
        setTimeout(() => {
          this.setState({
            changing: false
          })
        }, 200)
      }
    }
  }

  render () {
    const {displayed} = this.props.document
    if (!displayed) {
      return (<div className={styles.componentWrapper}>
        <p>There is no document to preview</p>
      </div>)
    }


    if (!this.state.url) {
      return (<div className={styles.componentWrapper}>
        <p>Hmm. Having problems constructing the web front-end URL.</p>
      </div>)
    }

    return (
      <div className={styles.componentWrapper}>
        <div className={styles.iframeContainer}>
          {!this.state.changing && (
            <iframe src={this.state.url} frameBorder={'0'} />
          )}
        </div>
      </div>
    )
  }
}

export default IframePreview