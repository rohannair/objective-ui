import React, { PropTypes } from 'react';
import styles from './Forms.css';

const TextArea = (props) =>
  <textarea
    type="text"
    className = { styles.textArea }
    placeholder = { props.placeholder }
    value = { props.value}
    onChange = { props.onChange }
  />;

TextArea.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

TextArea.defaultProps = {
  placeholder: 'Please enter text',
  value: '',
  onChange: (e) => console.info('text changed')
};

export default TextArea;
