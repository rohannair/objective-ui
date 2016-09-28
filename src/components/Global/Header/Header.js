import React from 'react';
import styles from './Header.css';
import { IndexLink } from 'react-router';

const Header = (props) => {
  const logoNode = props.noNav
  ? <span>Quartermaster</span>
  : <IndexLink to="/" className={styles.logo}>Quartermaster</IndexLink>

  return (
    <header className={styles.header}>
      { logoNode }
    </header>
  );
};

export default Header;
