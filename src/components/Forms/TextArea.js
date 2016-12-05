import React, { PropTypes } from 'react';
import styles from './Forms.css';

import { Input } from 'react-toolbox/lib/input';

const TextArea = (props) =>
  <Input
    type="text"
    className = { styles.textArea }
    label = { props.label || props.placeholder }
    value = { props.value }
    onChange = { props.onChange }
    multiline = { true }
  />;

TextArea.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  rows: PropTypes.number
};

TextArea.defaultProps = {
  placeholder: 'Please enter text',
  rows: 3,
  onChange: (e) => console.info('text changed')
};

export default TextArea;
