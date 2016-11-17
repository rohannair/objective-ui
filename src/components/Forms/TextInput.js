import React, { PropTypes } from 'react';
import styles from './Forms.css';

import { Input } from 'react-toolbox/lib/input';

const TextInput = (props) => {
  return (
    <Input
      label = { props.label || props.placeholder }
      value = { props.value }
      onChange = { props.onChange }
      type = { props.type }
    />
  );
};

TextInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  inputType: PropTypes.string,
};

TextInput.defaultProps = {
  value: '',
  onChange: (e) => console.info('text changed'),
  inputType: 'text'
};

export default TextInput;
