import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Styles
import classes from './CoreLayout.css';

import Header from '../../components/Global/Header';

const CoreLayout = ({ children }) =>
  <div className={classes.mainContainer}>
    <header className={classes.header}>
      <Header />

      <nav className={classes.nav}>
        <Link to={'/squads'}>
          <i className="zmdi zmdi-tab" />
          <span className={classes.nav__legend}>Squads</span>
        </Link>
        <Link to={'/users'}>
          <i className="zmdi zmdi-accounts-alt" />
          <span className={classes.nav__legend}>Users</span>
        </Link>
        <Link to={'/settings'}>
          <i className="zmdi zmdi-settings" />
          <span className={classes.nav__legend}>Settings</span>
        </Link>
      </nav>

      <nav className={classes.bottomNav}>
        <Link to={'/help'}>
          <i className="zmdi zmdi-help" />
          <span className={classes.nav__legend}>Help</span>
        </Link>
        <Link to={'/logout'}>
          <i className="zmdi zmdi-sign-in" />
          <span className={classes.nav__legend}>
            Log Out
          </span>
        </Link>
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
