import React, { Component, PropTypes } from 'react'
import styles from './Preferences.css'

import { connect } from 'react-redux'

import { getUser, editUser, clearMessage } from '../../state/actions/user.actions'

import Card from '../../components/Card'
import ChangePassword from '../../components/ChangePassword'
import SettingsProfile from '../../components/SettingsProfile'

class Preferences extends Component {
  constructor(props) {
    super(props)

    this.state = {
      componentToRender: 'profile',
    }
  };

  componentWillMount() {
    const id = this.props.global.user
    this.props.dispatch(getUser(id))
  };

  render() {
    const { user } = this.props
    const { componentToRender } = this.state

    if (!user.id) {
      return <div className={styles.Preferences}></div>
    }

    return (
      <div className={styles.preferences}>
        <div className={styles.controlBar}>
          <h2>Settings - {user.firstName} {user.lastName}</h2>

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

                { /*
                <li onClick={this._setVisible.bind(this, 'password')}>
                  <i className="zmdi zmdi-lock" />&nbsp;&nbsp;
                  Change Password
                </li>
                <li onClick={this._setVisible.bind(this, 'integrations')}>
                  <i className="zmdi zmdi-input-power" />&nbsp;&nbsp;
                  Integrations
                </li>
                */ }
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
    )
  };

  _submitProfile = (val) => {
    const { user, dispatch } = this.props

    // TODO: do a deep check here
    dispatch(editUser({...val, id: user.id}))
    return
  };

  _componentToRender = (val, user) => {
    switch (val) {
    case 'integrations':
      return <div>Coming soon!!!!</div>

    case 'password':
      return <ChangePassword
        message={this.props.user.message}
        handleSubmit={ this._submitProfile }
        clearMessage={ this.props._clearMessage }
      />

    case 'profile':
    default:
      return <SettingsProfile
        user={user}
        handleSubmit={ this._submitProfile }
        clearMessage={ this.props._clearMessage }
      />
    }
  };
  _clearMessage = () => this.props.dispatch(this.props.clearMessage());
  _setVisible = (val) => this.setState({ componentToRender: val });
};

const mapStateToProps = state => ({
  global: state.global,
  user: state.user
})

export default connect(mapStateToProps)(Preferences)
