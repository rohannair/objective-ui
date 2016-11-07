import React, { Component, PropTypes } from 'react';
import Button from '../../../components/Button';
import dateformat from 'dateformat';

import styles from './modal.css';

export default p => {
  const checkIns = p.data.map( c =>
    <li key={`checkin-${c.id}`} className={styles.checkin}>
      <div className={styles.checkin__header}>
        <h3>{c.name}</h3>
        <em>{dateformat(c.updatedAt, 'mmmm dS, h:MM TT')}</em>
      </div>
      <div className={styles.checkin__body}>
        {c.body}
      </div>
    </li>
  )

  return (
    <div className={styles.innerModal}>
      { checkIns }
    </div>
  )
}
