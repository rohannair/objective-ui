import React, { PropTypes } from 'react'
import { Link } from 'react-router'

// Styles
import classes from './CoreLayout.css'

import Header from '../../components/Global/Header'
import Modal from '../../containers/Modal'

const CoreLayout = ({ children }) =>
  <div className={classes.mainContainer}>
    <Modal />
    <header className={classes.header}>
      <Header />

      <nav className={classes.nav}>
        <Link to={'/feed'}>
          <i className="zmdi zmdi-graphic-eq" />
          <span className={classes.nav__legend}>Feed</span>
        </Link>
        <Link to={'/objectives'}>
          <i className="zmdi zmdi-compass" />
          <span className={classes.nav__legend}>Objectives</span>
        </Link>
      </nav>

      <nav className={classes.bottomNav}>
        <Link to={'/settings'}>
          <i className="zmdi zmdi-settings" />
          <span className={classes.nav__legend}>Settings</span>
        </Link>

        <Link to={'/privacy'}>
          <i className="zmdi zmdi-info" />
          <span className={classes.nav__legend}>Privacy</span>
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

  </div>

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout
