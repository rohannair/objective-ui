import React, { PropTypes } from 'react';
import styles from './LoadingBar.css';
import classNames from 'classnames/bind';

import ProgressBar from 'react-toolbox/lib/progress_bar';

let cx = classNames.bind(styles);

const LoadingBar = p => {
  const classname = cx({
    [styles.LoadingBar]: true
  });

  return (
    <div className={classname}>
      <div className={styles.loading}>
        <ProgressBar multicolor type="circular" mode="indeterminate" />
      </div>
    </div>
  );
};

export default LoadingBar;
