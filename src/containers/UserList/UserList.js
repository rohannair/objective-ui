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
import SkyLight from 'react-skylight';
import TextInput from '../../components/Forms/TextInput';

import { validateEmail } from '../../utils';

// Actions
import {
  getUsers,
  inviteUser
} from '../../state/actions/userList.actions';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.userListDefaultState = {
      newUser: {
        email: '',
        jobTitle: ''
      }
    };

    this.state = { ...this.userListDefaultState };
  };

  componentWillMount() {
    const { users, dispatch } = this.props;
    dispatch(getUsers(users.get('limit'), users.get('offset')));
  };

  render() {
    const { users } = this.props;
    const userItems = users.get('results')
      // .filter(user => user.pending === false)
      .map(user => {
        const userimg = user.img || '//placehold.it/250x250/eee?text=\?';
        const nameBox = user.firstName && user.lastName
        ? `${user.firstName } ${user.lastName }`
        : user.email;

        const titleBox = user.pending
        ? <Pill>Invited</Pill>
        : user.jobTitle || 'No title';

        return (
          <div key={user.id} className={styles.listItem}>
            <Card>
              <div className={ styles.header }>
                <img className={ styles.avatar} src={ userimg } />
                <h3>{ nameBox }</h3>
                <small>{ titleBox }</small>
              </div>

              <div className={ styles.body }>
                 <p className={styles.squads}>{ this._returnSquadPill(user.squads) }</p>
                 <p className={styles.missions}>{ this._returnObjectivesPill(user.objectives) }</p>
               </div>

            </Card>
          </div>
        );
      });

    const skylightStyles = {
      width: '40%',
      height: 'static',
      marginLeft: '-20%',
      marginTop: '0',
      top: '20%',
      padding: '30px'
    };

    return (
      <div className={styles.UserList}>
        <div className={styles.controlBar}>
          <div className={styles.macroContainer}>
          </div>
          <div className={styles.buttonContainer}>
            &nbsp;&nbsp;
            <Button
              primary
              onClick={ this._showInviteUserModal }
            >Invite User</Button>
          </div>
        </div>
        <div className={styles.cardContainer}>
          { userItems }
        </div>

        <SkyLight
          hideOnOverlayClicked
          title="Invite New User"
          ref="dialog"
          dialogStyles={ skylightStyles }
          afterClose={this._clearState}
        >
          <form className={styles.addUserModal} onSubmit={ this._validateInviteUserInputs }>
            <label className={styles.modal__item}>
              <h3 className={styles.modal__label}>Email</h3>
              <TextInput
                type='email'
                placeholder='Please enter email'
                value={this.state.newUser.email}
                onChange={ e => this.setState({
                  newUser: {
                    ...this.state.newUser,
                    email: e.target.value
                  }
                })}
                />
            </label>

            <label className={styles.modal__item}>
              <h3 className={styles.modal__label}>Job Title</h3>
              <TextInput
                placeholder='Please enter Job Title'
                value={this.state.newUser.jobTitle}
                onChange={ e => this.setState({
                  newUser: {
                    ...this.state.newUser,
                    jobTitle: e.target.value
                  }
                })}
                />
            </label>
            <Button primary onClick={ this._validateInviteUserInputs }>Send Invite</Button>
          </form>
        </SkyLight>

      </div>
    );
  };

  _clearState = () => this.setState({
    ...this.userListDefaultState
  });

  _showInviteUserModal = (e) => {
    e.preventDefault();
    this.refs.dialog.show();
  };

  _validateInviteUserInputs = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { newUser: { email, jobTitle } } = this.state;
    const { dispatch } = this.props;

    if (!validateEmail(email) || !jobTitle) return console.error('Not an email!');

    // Dispatch action
    dispatch(inviteUser({ email, jobTitle }));

    // Close Modal
    this.refs.dialog.hide();
  };

  _returnObjectivesPill = (objectives) => {
    const count = objectives && objectives.length || 0;
    if (count === 0) return <Pill danger>No OKRs</Pill>;
    return <Pill warning>{`${count} ${count === 1 ? 'OKR' : 'OKRs'}`}</Pill>;
  };

  _returnSquadPill = (squads) => {
    const count = squads && squads.length || 0;
    if (count === 0) return <Pill danger>No Squads</Pill>;
    return count > 1
      ? <Pill info>{`In ${count} squads`}</Pill>
      : <Pill info>{ squads[0].name }</Pill>;
  };
}

const mapStateToProps = state => ({
  users: state.get('users')
});

export default connect(mapStateToProps)(UserList);
