import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'

import LoadingBar from '../LoadingBar'

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
    imageExists: PropTypes.bool
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

    if (uploadedFile) {
      const MAX_WIDTH = 1280
      const MAX_HEIGHT = 720

      const img = new Image()
      const reader  = new FileReader()

      reader.onload = (ev) => {
        img.src = ev.target.result

        let canvas = document.createElement('canvas')
        let canvasCtx = canvas.getContext('2d')
        canvasCtx.drawImage(img, 0, 0)

        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }

        canvas.width = width
        canvas.height = height

        canvasCtx = canvas.getContext('2d')
        canvasCtx.drawImage(img, 0, 0, width, height)

        const preableLength = 'data:image/jpeg;base64,'.length
        let dataurl = canvas.toDataURL('image/jpeg', 0.7).slice(preableLength)

        cb(dataurl)
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
