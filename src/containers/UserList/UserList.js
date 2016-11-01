import React, { Component, PropTypes } from 'react';
import styles from './UserList.css';

import { connect } from 'react-redux';
import Immutable from 'immutable';
import { Link } from 'react-router';
import dateFormat from 'dateformat';

// Deps
import Card from '../../components/Card';
import Button from '../../components/Button';
import Pill from '../../components/Pill';

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

      return (
        <div key={user.id} className={styles.listItem}>
          <Card>
            <div className={ styles.header }>
              <img className={ styles.avatar} src={ userimg } />
              <h3>{ `${user.firstName} ${user.lastName}` }</h3>
              <small>{ user.jobTitle }</small>
            </div>

            <div className={ styles.body }>
              <p className={styles.squads}>{ this._returnSquadPill(user.squads) }</p>
              <p className={styles.missions}>{ this._returnMissionPill(user.missions) }</p>
            </div>

            <div className={ styles.footer }>
              <Link to={`users/${user.id}`}>View User File</Link>
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
              onClick={ this._inviteUser }
            >Invite User</Button>
          </div>
        </div>
        <div className={styles.cardContainer}>
          { userItems }
        </div>

      </div>
    );
  };

  _inviteUser = e => e.preventDefault();

  _returnMissionPill = ({length: count}) => {
    if (count === 0) return <Pill danger>No Missions</Pill>;
    return <Pill warning>{`${count} ${count === 1 ? 'mission' : 'missions'}`}</Pill>;
  };

  _returnSquadPill = (squads) => {
    const count = squads.length;
    if (count === 0) return <Pill danger>Not assigned to a squad</Pill>;
    return count > 1
      ? <Pill info>{`In ${count} squads`}</Pill>
      : <Pill info>{ squads[0].name }</Pill>;
  };
}

const mapStateToProps = state => ({
  users: state.get('users')
})

export default connect(mapStateToProps)(UserList);
