import React, { PropTypes } from 'react';
import styles from './Modal.css';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

const Modal = p => {
  const innerClasses = cx({
    [styles.lg]: p.size === 'lg',
    [styles.md]: p.size === 'md',
    [styles.sm]: p.size === 'sm',
    [styles.xs]: p.size === 'xs',
    innerModal: true
  });

  const outerClasses = cx({
    noBg: p.noBg,
    outerModal: true
  });

  console.warn('Modal component is deprecated. Use Skylight instead');

  return (
    <div className={styles.outerModal} onClick={p.closeModal}>
      <div className={ innerClasses }>
        { p.children }
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
  noBg: PropTypes.bool
};

export default Modal;

