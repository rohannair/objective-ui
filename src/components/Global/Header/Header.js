import React from 'react';
import styles from './Header.css';
import { IndexLink } from 'react-router';

import LogoIcon from '../../../images/objectiveiq-icon.svg';

const Header = (props) => {
  const logoNode = props.noNav
  ? <LogoIcon className={styles.logo} />
  : <IndexLink to="/" className={styles.logo}><LogoIcon className={styles.logo} /></IndexLink>;

  return (
    <header className={styles.header}>
      { logoNode }
    </header>
  );
};

export default Header;
