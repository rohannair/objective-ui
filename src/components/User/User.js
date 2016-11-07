import React, { PropTypes } from 'react';
import styles from './User.css';

import Pill from '../Pill';

const User = p => {
  const user = p.data;
  const leaderBadge = p.leader
  ? <Pill info>Leader</Pill>
  : undefined;
  return (
    <div className={styles.user}>
      <div className={styles.header}>
        <img src={user.img} className={styles.avatar} />
        <div className={styles.headerInfo}>
          <h4>{`${user.firstName} ${user.lastName}`} { leaderBadge }</h4>
          <p>{user.jobTitle}</p>

        </div>
      </div>
      <div className={styles.body}>
      </div>
    </div>
  );
};

export default User;
