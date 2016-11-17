import React, { Component, PropTypes } from 'react';
import styles from './ChangePassword.css';
import classNames from 'classnames/bind';

import Button from '../../components/Button';
import Alert from '../../components/Alert';
import TextInput from '../../components/Forms/TextInput';

import zxcvbn from 'zxcvbn';

let cx = classNames.bind(styles);

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      newPassword: '',
      newPassword2: '',
      message: '',
      strength: 0
    }
  }

  render() {
    const classname = cx({
      [styles.ChangePassword]: true
    });

    const alert = this.state.message
    ? <Alert type="danger" close={() => this.setState({ message: '' })}>{ this.state.message }</Alert>
    : null;

    return (
      <div className={classname}>
        <h2>Change Password</h2>
        <form onSubmit={this._handleSubmit}>
          <label>
            <TextInput
              type="password"
              label="Old Password:"
              onChange={this._handleChange.bind(this, 'password')}
              value={this.state.password}
            />
          </label>

          <label>
            <TextInput
              type="password"
              label="New Password:"
              onChange={this._checkStrength}
              value={this.state.newPassword}
            />
            <small className={styles.strengthMeter}>
              <em>Password strength:</em> {this.state.strength}/4

              { this.state.strength === 3 ? <div className={styles.okayPassword}><i className="zmdi zmdi-check-circle" /> (Keep going!)</div> : null }
              { this.state.strength === 4 ? <div className={styles.goodPassword}><i className="zmdi zmdi-check-circle" /></div> : null }
            </small>
          </label>

          <label>
            <TextInput
              type="password"
              label="Re-enter New Password:"
              onChange={this._handleChange.bind(this, 'newPassword2')}
              value={this.state.newPassword2}
            />
          </label>

          { alert }
          <Button primary onClick={this._handleSubmit}>Confirm</Button>
        </form>
      </div>
    );
  };

  _checkStrength = (val) => {
    const { score, feedback: { warning, suggestions } } = zxcvbn(val);
    console.warn({ score, warning, suggestions });
    this.setState(
      { strength: score},
      this._handleChange('newPassword', val)
    );
  };

  _handleChange = (name, val) => this.setState({ ...this.state, [name]: val });
  _handleSubmit = (e) => {
    e.preventDefault();

    const { password, newPassword, newPassword2, strength } = this.state;

    if (!password) {
      this.setState({
        message: 'Please fill out all fields'
      });

      return;
    }

    if (parseInt(strength) < 3) {
      this.setState({
        message: 'New password is too weak'
      });

      return;
    };

    if (newPassword !== newPassword2) {
      // TODO: proper messaging here
      this.setState({
        ...this.state,
        message: 'Passwords do not match'
      })
      return;
    }

    this.props.handleSubmit({password, newPassword});
  }
};

export default ChangePassword;
