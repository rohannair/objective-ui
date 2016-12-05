import React, { PropTypes } from 'react';
import styles from './UserCard.css';
import classNames from 'classnames/bind';

import Card from '../Card';
import Pill from '../Pill';

let cx = classNames.bind(styles);

const UserCard = ({ user }) => {
  const classname = cx({
    [styles.UserCard]: true
  });

  const userimg = user.img || '//placehold.it/250x250/eee?text=\?';
  const nameBox = user.firstName && user.lastName
  ? `${user.firstName } ${user.lastName }`
  : user.email;

  const titleBox = user.pending
  ? <Pill>Invited</Pill>
  : user.jobTitle || 'No title';

  const returnSquadPill = (squads) => {
    const count = squads && squads.length || 0;
    if (count === 0) return <Pill danger>No Squads</Pill>;
    return count > 1
    ? <Pill info>{`In ${count} squads`}</Pill>
    : <Pill info>{ squads[0].name }</Pill>;
  };

  const returnObjectivesPill = (objectives) => {
    const count = objectives && objectives.length || 0;
    if (count === 0) return <Pill danger>No OKRs</Pill>;
    return <Pill warning>{`${count} ${count === 1 ? 'OKR' : 'OKRs'}`}</Pill>;
  };


  return (
    <Card>
      <div className={ styles.header }>
        <img className={ styles.avatar} src={ userimg } />
        <h3>{ nameBox }</h3>
        <small>{ titleBox }</small>
      </div>

      <div className={ styles.body }>
        <p className={styles.squads}>{ returnSquadPill(user.squads) }</p>
        <p className={styles.missions}>{ returnObjectivesPill(user.objectives) }</p>
      </div>

    </Card>
  );
};

export default UserCard;
