import React from 'react';
import styles from './Card.css';

import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

export default c => {
  const classname = cx({
    [styles.card]: true,
    [styles.mb]: c.mb
  });

  return (
    <div className={classname}>{c.children}</div>
  );
};
