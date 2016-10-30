import React, { Component, PropTypes } from 'react';
import styles from './UserList.css';

import { connect } from 'react-redux';
import Immutable from 'immutable';
import { Link } from 'react-router';
import dateFormat from 'dateformat';

// Deps
import Card from '../../components/Card';
import Button from '../../components/Button';

// Actions
import {
  getUsers
} from '../../state/actions/userList.actions';

class UserList extends Component {
  constructor(props) {
    super(props);
  };

  componentWillMount() {
    const { users, dispatch } = this.props;
    dispatch(getUsers(users.get('limit'), users.get('offset')))
  };

  render() {
    const { users } = this.props;
    const userItems = users.get('results').map(user => {
      const userimg = user.img || `//placehold.it/250x250/eee?text=\?`;
      const squadCount = user.squads.length;
      const squadDiv = squadCount > 1
      ? `In ${squadCount} squads`
      : user.squads[0].name;

      return (
        <div key={user.id} className={styles.listItem}>
          <Card>
            <div className={ styles.header }>
              <img className={ styles.avatar} src={ userimg } />
              <h3>{ `${user.firstName} ${user.lastName}` }</h3>
              <p>{ user.email }</p>
              <p className={styles.squads}>{ squadDiv }</p>
            </div>
            <div className={ styles.footer }>
              <Link to={`users/${user.id}`}>Edit</Link>
            </div>
          </Card>
        </div>
      );
    });

    return (
      <div className={styles.UserList}>
        <div className={styles.controlBar}>
          <div className={styles.macroContainer}>
          </div>
          <div className={styles.buttonContainer}>
            &nbsp;&nbsp;
            <Button
              primary
              onClick={ this._addNewMission }
            >Invite User</Button>
          </div>
        </div>
        <div className={styles.cardContainer}>
          { userItems }
        </div>

      </div>
    );
  };
}

const mapStateToProps = state => ({
  users: state.get('users')
})

export default connect(mapStateToProps)(UserList);
