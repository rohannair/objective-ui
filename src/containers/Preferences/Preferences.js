import React, { Component, PropTypes } from 'react';
import styles from './Preferences.css';

import { connect } from 'react-redux';
import Immutable from 'immutable';

import { getUser, editUser } from '../../state/actions/user.actions';

import Card from '../../components/Card';
import ChangePassword from '../../components/ChangePassword';
import SettingsProfile from '../../components/SettingsProfile';

class Preferences extends Component {
  constructor(props) {
    super(props);

    this.state = {
      componentToRender: 'profile',
    }
  };

  componentWillMount() {
    const id = this.props.global.get('user');
    this.props.dispatch(getUser(id));
  };

  render() {
    const { user } = this.props;
    const { componentToRender } = this.state;

    if (!user.get('id')) {
      return <div className={styles.Preferences}></div>
    }

    return (
      <div className={styles.preferences}>
        <div className={styles.controlBar}>
          <h2>Settings - {user.get('firstName')} {user.get('lastName')}</h2>

          <div className={styles.buttonContainer}>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.settingPickerContainer}>
            <Card>
              <ul className={styles.settingsPicker}>
                <li onClick={this._setVisible.bind(this, 'profile')}>
                  <i className="zmdi zmdi-account-circle" />&nbsp;&nbsp;
                  Edit Profile
                </li>

                <li onClick={this._setVisible.bind(this, 'password')}>
                  <i className="zmdi zmdi-lock" />&nbsp;&nbsp;
                  Change Password
                </li>

                <li onClick={this._setVisible.bind(this, 'integrations')}>
                  <i className="zmdi zmdi-input-power" />&nbsp;&nbsp;
                  Integrations
                </li>
              </ul>
            </Card>
          </div>

          <div className={styles.profileCard}>
            <Card>
              <div className={styles.innerProfile}>
                { this._componentToRender(this.state.componentToRender, user) }
              </div>
            </Card>
          </div>

        </div>
      </div>
    );
  };

  _submitProfile = (val) => {
    const { user, dispatch } = this.props;
    if (!Immutable.is(this.props.user, val)) {
      // TODO: figure out why the fuck my call for editUser on password change
      // isn't sending val properly and instead makes a call with old val?
      dispatch(editUser({...val, id: user.get('id')}));
    }
    return;
  };

  _componentToRender = (val, user) => {
    switch (val) {
    case 'integrations':
      return <div>Coming soon!!!!</div>;

    case 'password':
      return <ChangePassword handleSubmit={ this._submitProfile } />;

    case 'profile':
    default:
      return <SettingsProfile user={user} handleSubmit={ this._submitProfile }/>;
    }
  };

  _setVisible = (val) => this.setState({ componentToRender: val });
}

const mapStateToProps = state => ({
  global: state.get('global'),
  user: state.get('user')
});

export default connect(mapStateToProps)(Preferences);
