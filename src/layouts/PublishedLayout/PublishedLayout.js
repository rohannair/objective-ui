import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Styles
import 'ress';
import classes from './PublishedLayout.css';

import Header from 'components/Global/Header';

const PublishedLayout = ({ children }) =>
  <div className={classes.mainContainer}>
    <header className={classes.header}>
      <Header noNav />
    </header>

    <div className={classes.body}>
      { children }
    </div>
  </div>;

PublishedLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default PublishedLayout;
