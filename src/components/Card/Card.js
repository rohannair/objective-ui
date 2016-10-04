import React from 'react';
import styles from './Card.css';
import merge from 'lodash/merge';

export default c => <div className={styles.card}>{c.children}</div>;
