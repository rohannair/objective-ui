import React, { PropTypes } from 'react'
import styles from './Forms.css'

import { Input } from 'react-toolbox/lib/input'

const TextInput = (props) => {
  return (
    <Input
      label = { props.label || props.placeholder }
      onChange = { props.onChange }
      type = { props.type }
      defaultValue = { props.defaultValue }
    />
  )
}

TextInput.propTypes = {
  onChange: PropTypes.func,
  inputType: PropTypes.string,
}

TextInput.defaultProps = {
  onChange: (e) => console.info('text changed'),
  inputType: 'text'
}

export default TextInput
