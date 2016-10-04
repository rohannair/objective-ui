import React from 'react';
import styles from './Header.css';
import { IndexLink } from 'react-router';

const Header = (props) => {
  const logoNode = props.noNav
  ? <span>Q</span>
  : <IndexLink to="/" className={styles.logo}>Q</IndexLink>;

  return (
    <header className={styles.header}>
      { logoNode }
    </header>
  );
};

export default Header;
