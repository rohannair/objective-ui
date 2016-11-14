import React, { Component, PropTypes } from 'react';
import styles from './Signup.css';

import { connect } from 'react-redux';
import Immutable from 'immutable';

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={ styles.container }>
        <div className={ styles.signupBox }>
          <h2>Sign Up</h2>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(Signup);

