import React, { PropTypes } from 'react';
import styles from './Objective.css';

const Objective = p => {

  return (
    <div className={styles.Objective}>
      <h4 className={styles.label}>Objective:</h4>
      <p className={styles.valueContainer}>{ p.data.name }</p>

      <h4 className={styles.label}>Key Results:</h4>
      <ul className={styles.valueContainer}>
        { p.data.key_results.map(v => <li key={v.id}>{v.name}</li>)}
      </ul>

      <h4 className={styles.label}>Timeline:</h4>
      <p className={styles.valueContainer}>{ p.data.timeline }</p>
    </div>
  );
};

export default Objective;
