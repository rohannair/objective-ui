import React, { Component, PropTypes } from 'react';
import styles from './CreateUser.css';

import { connect } from 'react-redux';
import LoadingBar from 'components/LoadingBar';

import { tryCreateUser } from 'state/actions/auth.actions';

class CreateUser extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(tryCreateUser(this.props.location.query));
  }

  render() {
    return (
      <div className={styles.CreateUser}>
        <LoadingBar />
        <h2 className={styles.message}>Hold tight while we create your account...</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(CreateUser);

