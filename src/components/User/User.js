import React, { PropTypes } from 'react';
import styles from './User.css';

import Button from '../../components/Button';
import Pill from '../Pill';


const User = p => {
  const user = p.data;
  const leaderBadge = false || p.leader
  ? <Pill info>Leader</Pill>
  : undefined;

  const objective = user.objectives.length > 0
  ? user.objectives
      .filter(o => o.squadId === p.squadId)
      .map(o =>
        <div key={o.id} className={styles.objective}>
          <p>{o.name}</p>
          <ul>{o.key_results.map(kr => <li key={kr.id}>{kr.name}</li>)}</ul>

          <h4>Resources</h4>
          <ul>{o.resources.map(r => <li key={r.id}>{r.name}</li>)}</ul>
      </div>)
  : <div className={styles.buttonContainer}>
      <Button transparent onClick={ e => {
        e.preventDefault();
        p.showOKRModal(p.squadId, p.data.id)
      }}>Add Objective</Button>
    </div>;

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
        <h4>Objectives:</h4>
        {objective}
      </div>
    </div>
  );
};

export default User;
