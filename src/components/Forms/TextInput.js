import React, { PropTypes } from 'react';
import styles from './Forms.css';

const TextInput = (props) => {
  return (
    <input
      type={props.inputType}
      className = { styles.textInput }
      placeholder = { props.placeholder }
      defaultValue = { props.value }
      onChange = { props.onChange }
    />
  );
}

TextInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  inputType: PropTypes.string,
};

TextInput.defaultProps = {
  placeholder: 'Please enter text',
  value: '',
  onChange: (e) => console.info('text changed'),
  inputType: 'text'
};

export default TextInput;
