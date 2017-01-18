import React, { Component, PropTypes } from 'react'
import styles from './Uploader.css'

import FormData from 'form-data'

class Uploader extends Component {
  static propTypes = {
    submitImage: PropTypes.func.isRequired,
    icon: PropTypes.string
  }

  render() {
    const { icon, submitImage } = this.props
    return (
      <label className={styles.label}>
        { icon && <i className={`zmdi zmdi-${icon}`} />}
        <input
          className={styles.fileInput}
          type="file"
          onChange={ this._validateUpload.bind(this, submitImage) }
          accept="image/*; capture=camera"
          ref={input => {
            this.fileInput = input
          }}
        />
      </label>
    )
  }

  _validateUpload = (cb, e) => {
    const uploadedFile = e.target.files[0]

    if (uploadedFile) {
      const reader  = new FileReader()
      reader.onload = function(ev) {
        let binaryString = ev.target.result
        cb(btoa(binaryString))
      }

      reader.readAsBinaryString(uploadedFile)
    }

    // cb(form)
  }
}

export default Uploader
