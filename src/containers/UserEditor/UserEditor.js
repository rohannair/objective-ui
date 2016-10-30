import React, { Component, PropTypes } from 'react';
import styles from './UserEditor.css';

import { connect } from 'react-redux';
import Immutable from 'immutable';
import dateFormat from 'dateformat';

import { getUser } from '../../state/actions/user.actions';

class UserEditor extends Component {
  constructor(props) {
    super(props);
  };

  componentWillMount() {
    const { id } = this.props.params;
    this.props.dispatch(getUser(id));
  };

  render() {
    const { user } = this.props;
    debugger;
    return (
      <div>
        <h1>{`${user.get('firstName')} ${user.get('lastName')}`}</h1>
        <img src={user.get('img')} />
        <p>{user.get('title')}</p>

      </div>
    )
  };
}

const mapStateToProps = state => ({
  user: state.get('user')
});

export default connect(mapStateToProps)(UserEditor);
