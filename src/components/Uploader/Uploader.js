import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'

import LoadingBar from '../LoadingBar'
import { resizeImageToFitAsJPEG, cropImageToMaxSizeAsJPEG } from '../../utils/image'

class Uploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: false
    }
  }

  static propTypes = {
    submitImage: PropTypes.func.isRequired,
    imageExists: PropTypes.bool,
    resizeOptions: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      type: PropTypes.oneOf(['crop', 'resize'])
    })
  }

  render() {
    const { icon, submitImage, className, children } = this.props
    if (this.state.loading) return <LoadingBar />

    return (
      <label className={className}>
        { children }
        <input
          className="fileInput"
          type="file"
          onChange={ this._validateUpload.bind(this, submitImage) }
          accept="image/*; capture=camera"
        />
      </label>
    )
  }

  _validateUpload = (cb, e) => {
    this.setState({ loading: true })
    const uploadedFile = e.target.files[0]
    const { resizeOptions } = this.props

    if (uploadedFile) {
      const reader  = new FileReader()

      reader.onload = (ev) => {
        switch (resizeOptions.type) {
        case 'crop':
          cb(cropImageToMaxSizeAsJPEG(resizeOptions.width, resizeOptions.height, ev.target.result))
          break
        case 'resize':
          cb(resizeImageToFitAsJPEG(resizeOptions.width, resizeOptions.height, ev.target.result))
          break
        default:
          break
        }

        this.setState({ loading: false })
      }
      reader.readAsDataURL(uploadedFile)
    }
  }
}

export default styled(Uploader)`
  color: ${ props => {
    if (props.imageExists) return 'red'
    return '#ccc'
  }};

  font-size: 1.2em;
  cursor: pointer;
  padding: 5px;
  transition: color 0.25s ease-in-out;

  i {
    font-weight: bold;
  }

  &:hover {
    color: red;
  }

  &:active {
    position: relative;
    top: 1px;
  }
  .fileInput {
    display: none;
  }
`
