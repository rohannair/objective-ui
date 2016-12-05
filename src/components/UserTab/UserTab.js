import React, { PropTypes } from 'react';
import styles from './UserTab.css';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

const UserTab = p => {
  const classname = cx({
    [styles.UserTab]: true
  });

  return (
    <div className={classname}>
      <div className={styles.avatarContainer}>
        <img src={p.img} className={styles.avatar} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{p.firstName} {p.lastName}</h3>
        { p.children }
      </div>
    </div>
  );
};

export default UserTab;
