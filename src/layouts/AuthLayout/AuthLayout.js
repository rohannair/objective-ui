import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Styles
import 'ress';
import classes from './AuthLayout.css';

import Header from '../../components/Global/Header';

const AuthLayout = ({ children }) =>
  <div className={classes.mainContainer}>
    <div className={ classes.body }>
      { children }
    </div>
  </div>;

  AuthLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default AuthLayout;
