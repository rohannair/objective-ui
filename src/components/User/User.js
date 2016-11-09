import React, { PropTypes } from 'react';
import styles from './User.css';

import Button from '../../components/Button';
import Pill from '../Pill';

const User = p => {
  if (!(p.data && p.data.objectives)) {
    return <div></div>
  }

  const user = p.data;
  const checkInCount = user.objectives.length > 0
  ? user.objectives[0].check_ins.length
  : 0;

  const leaderBadge = false || p.leader
  ? <Pill info>Leader</Pill>
  : undefined;

  const openOKRMenu = (e) => {
    e.preventDefault();
    p.onMenuClick(p.data.id);
  };

  const closeOKRMenu = (e) => {
    e.preventDefault();
    p.onMenuClick('');
  };

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
        p.showOKRModal(p.squadId, p.data.id);
      }}>Add Objective</Button>
    </div>;

  const moreDropdown = p.openMenu
  ? <div className={styles.moreDropdown}>
    <ul>
      { /* <li onClick={p.onEditClick}>
        <i className="zmdi zmdi-edit"></i>
        &nbsp;&nbsp;
        Edit Objective
      </li> */}
      <li onClick={(e) => {
        e.preventDefault();

        // TODO: fix this hacker
        const { id } = user.objectives
          .filter(o => o.squadId === p.squadId)[0];

        p.onNewCheckinClick(id, p.data.id);
      }}>
        <i className="zmdi zmdi-comment-edit"></i>
        &nbsp;&nbsp;
        Add Checkin
      </li>
      <li onClick={(e) => {
        if (p.data.objectives.length > 0) {
          p.viewCheckIn(p.data.objectives[0].check_ins)
        }
      }}>
        <i className="zmdi zmdi-comment"></i>
        &nbsp;&nbsp;
        View Checkins <Pill info>{checkInCount}</Pill>
      </li>
    </ul>
  </div>
  : undefined;

  return (
    <div className={styles.user}>
      <div className={styles.header}>
        <img src={user.img} className={styles.avatar} />
        <div className={styles.headerInfo}>
          <h4>{`${user.firstName} ${user.lastName}`} { leaderBadge }</h4>
          <p>{user.jobTitle}</p>
        </div>
        <div className={styles.moreBar}>
          <div className={styles.more__action} onMouseEnter={openOKRMenu} onMouseLeave={closeOKRMenu}>
            <i className="zmdi zmdi-more-vert"></i>
            { moreDropdown }
          </div>
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
