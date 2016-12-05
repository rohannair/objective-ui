import React, { Component, PropTypes } from 'react';
import styles from './ForgotPassword.css';

import { connect } from 'react-redux';

import TextInput from 'components/Forms/TextInput';
import Button from 'components/Button';

import { validateEmail } from '../../utils';
import { tryAcceptInvite } from 'state/actions/auth.actions';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: {
        email: this.props.location.query.id,
        password: '',
        token: this.props.location.query.token,
      },
      messages: {
        email: '',
        password: '',
        token: ''
      }
    };
  };

  componentDidMount() {
    const { id, token } = this.props.location.query;

    if (!token || !validateEmail(id)) {
      this.setState({
        messages: {
          token: 'Reset password link is invalid, please try again'
        }
      });
    }
  }

  render() {
    const {
      email,
      password
    } = this.state.auth;

    if (this.state.messages.token) {
      return (
        <div className={ styles.signupBox }>
          <h2>Sign Up Error</h2>
          <div className={styles.alert}>{ this.state.messages.token }</div>
        </div>
      );
    }

    const passwordMessage = this.state.messages.password
    ? <div className={styles.alert}>{ this.state.messages.password }</div>
    : undefined;

    return (
      <div className={ styles.signupBox }>
        <h2>Create a New Password</h2>

        <form className={styles.loginForm}>
          <label className={styles.formGroup}>
            <div>{email}</div>
          </label>

          <label className={styles.formGroup}>
            <TextInput type="password" placeholder="Enter password"
              onChange={this._setInput.bind(this, 'password')}
              value={this.state.auth.password}
            />
            { passwordMessage }
          </label>

          <Button primary onClick={this._submitForm}>Submit</Button>
        </form>
      </div>
    );
  };

  _setInput = (key, val) => {
    let { auth, messages } = this.state;
    this.setState({
      auth: {
        ...auth,
        [key]: val
      },
      messages: {
        ...messages,
        [key]: null
      }
    });
  };

  _submitForm = e => {
    e.preventDefault();
    e.stopPropagation();

    const { auth } = this.state;
    const { dispatch } = this.props;

    if (!(auth.password && auth.password.length > 6)) {
      this.setState({
        messages: {
          password: 'Please enter a valid password'
        }
      });
      return;
    }

    // Todo: Change this for forgot password
    dispatch(tryAcceptInvite(auth));
    return;

  };
}

export default connect()(ForgotPassword);
