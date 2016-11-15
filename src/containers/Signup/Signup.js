import React, { Component, PropTypes } from 'react';
import styles from './Signup.css';

import { connect } from 'react-redux';
import Immutable from 'immutable';

import TextInput from 'components/Forms/TextInput';
import Button from 'components/Button';

import { validateEmail } from '../../utils';
import { tryAcceptInvite } from 'state/actions/auth.actions';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: {
        email: this.props.location.query.id,
        password: '',
        token: this.props.location.query.token,
        firstName: '',
        lastName: ''
      },
      messages: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        token: ''
      }
    };
  };

  componentDidMount() {
    const { id, token } = this.props.location.query;

    if (!token || !validateEmail(id)) {
      this.setState({
        messages: {
          token: 'Signup link is invalid, please try again'
        }
      });
    }
  }

  render() {
    const {
      email,
      password,
      firstName,
      lastName
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

    const firstNameMessage = this.state.messages.firstName
    ? <div className={styles.alert}>{ this.state.messages.firstName }</div>
    : undefined;

    const lastNameMessage = this.state.messages.lastName
    ? <div className={styles.alert}>{ this.state.messages.lastName }</div>
    : undefined;


    return (
      <div className={ styles.signupBox }>
        <h2>Sign Up</h2>

        <form className={styles.loginForm}>
          <label className={styles.formGroup}>
            <span className={ styles.formLabel }>email:</span>
            <div>{email}</div>
          </label>

          <label className={styles.formGroup}>
            <span className={ styles.formLabel }>Password:</span>
            <TextInput inputType="password" placeholder="Enter password"
              onChange={e => this._setInput(e, 'password') }
            />
            { passwordMessage }
          </label>

          <label className={styles.formGroup}>
            <span className={ styles.formLabel }>First Name:</span>
            <TextInput placeholder="First Name"
              onChange={e => this._setInput(e, 'firstName') }
            />
            { firstNameMessage }
            <span className={ styles.formLabel }>Last Name:</span>
            <TextInput placeholder="Last Name"
              onChange={e => this._setInput(e, 'lastName') }
            />
            { lastNameMessage }
          </label>

          <Button primary onClick={this._submitForm}>Submit</Button>
        </form>
      </div>
    );
  };

  _setInput = (e, val) => {
    let { auth, messages } = this.state;
    this.setState({
      auth: {
        ...auth,
        [val]: e.target.value
      },
      messages: {
        ...messages,
        [val]: null
      }
    });
  };

  _submitForm = e => {
    e.preventDefault();
    e.stopPropagation();

    const { auth } = this.state;
    const { dispatch } = this.props;

    if(!(auth.password && auth.password.length > 6)) {
      this.setState({
        messages: {
          password: 'Please enter a valid password'
        }
      });
      return;
    }

    if (!auth.firstName) {
      this.setState({
        messages: {
          firstName: 'Please enter your first name'
        }
      });
      return;
    }

    if (!auth.lastName) {
      this.setState({
        messages: {
          firstName: 'Please enter your last name'
        }
      });
      return;
    }

    dispatch(tryAcceptInvite(auth));
    return;

  };
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(Signup);
