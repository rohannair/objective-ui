import React, { PropTypes } from 'react';
import styles from './Button.css';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

const Button = p => {
  const className = cx({
    [styles.primary]: p.primary,
    [styles.secondary]: p.secondary,
    [styles.transparent]: p.transparent,
    [styles.sm]: p.size === 'sm',
    [styles.right]: p.right,
    [styles.link]: p.link || (!p.primary && !p.secondary)
  });

  return (
    <button className={className} onClick={p.onClick}>
      { p.children }
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])
};

export default Button;
