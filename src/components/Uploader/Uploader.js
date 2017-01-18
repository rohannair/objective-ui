import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'

import LoadingBar from '../LoadingBar'

class Uploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  static propTypes = {
    submitImage: PropTypes.func.isRequired,
    imageExists: PropTypes.bool,
    icon: PropTypes.string
  }

  render() {
    const { icon, submitImage, className } = this.props
    if (this.state.loading) return <LoadingBar />

    return (
      <label className={className}>
        { icon && <i className={`zmdi zmdi-${icon}`} />}
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
      const reader  = new FileReader()
      reader.onload = function(ev) {
        let binaryString = ev.target.result
        cb(btoa(binaryString))

        this.setState({ loading: false })
      }.bind(this)

      reader.readAsBinaryString(uploadedFile)
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
