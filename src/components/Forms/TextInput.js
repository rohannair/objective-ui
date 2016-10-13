import React, { PropTypes } from 'react';
import styles from './Forms.css';

const TextInput = (props) =>
  <input
    type="text"
    className = { styles.textInput }
    placeholder = { props.placeholder }
    defaultValue = { props.value }
    onChange = { props.onChange }
  />;

TextInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

TextInput.defaultProps = {
  placeholder: 'Please enter text',
  value: '',
  onChange: (e) => console.info('text changed')
};

export default TextInput;
