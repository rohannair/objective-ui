import React, { PropTypes } from 'react';
import styles from './Pill.css';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

const Pill = p => {
  const className = cx({
    [styles.info]: p.info,
    [styles.warning]: p.warning,
    [styles.danger]: p.danger,
    [styles.success]: p.success || (!p.info && !p.warning && !p.danger)
  });

  return (
    <span className={className}>
      { p.children }
    </span>
  );
};

export default Pill;
