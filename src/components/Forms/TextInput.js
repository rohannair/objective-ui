import React, { PropTypes } from 'react'
import styles from './Forms.css'

import { Input } from 'react-toolbox/lib/input'

const TextInput = (props) => {
  return (
    <Input
      icon = { props.icon }
      label = { props.label || props.placeholder }
      onChange = { props.onChange }
      onKeyPress = { props.onKeyPress }
      type = { props.type }
      defaultValue = { props.defaultValue }
      className = { props.className }
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
