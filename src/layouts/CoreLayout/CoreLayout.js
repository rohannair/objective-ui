import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Styles
import 'ress';
import classes from './CoreLayout.css';

import Header from '../../components/Global/Header';

const CoreLayout = ({ children }) =>
  <div className={classes.mainContainer}>
    <header className={classes.header}>
      <Header />
      <nav className={classes.nav}>
        <Link to={'/missions'}>M</Link>
        <Link to={'/missions'}>U</Link>
      </nav>
    </header>

    <div className={ classes.body }>
      { children }
    </div>
  </div>;

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default CoreLayout;
