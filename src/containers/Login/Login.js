import React, { Component, PropTypes } from 'react';
import styles from './Login.css';
import { connect } from 'react-redux';

import TextInput from 'components/Forms/TextInput';
import Button from 'components/Button';

import { validateEmail } from 'utils';
import { tryLogin } from 'state/actions/auth.actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginTries: 0,
      auth: {
        username: '',
        password: ''
      },
      messages: {
        main: null,
        username: null,
        password: null
      }
    }

    this.re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  render() {
    const usernameMessage = this.state.messages.username
    ? <div className="alert">{ this.state.messages.username }</div>
    : undefined;

    const passwordMessage = this.state.messages.password
    ? <div className="alert">{ this.state.messages.password }</div>
    : undefined;

    return (
      <div className={ styles.container }>
        <div className={ styles.loginBox }>
          <h2>Log In</h2>

          <form className={styles.loginForm} onSubmit={ this._submitForm }>
            <label className={ styles.formGroup }>
              <span className={ styles.formLabel }>Username:</span>
              <TextInput placeholder="Enter username"
                onChange={e => this._setInput(e, 'username')}
              />
              { usernameMessage }
            </label>

            <label className={ styles.formGroup }>
              <span className={ styles.formLabel }>Password:</span>
              <TextInput inputType="password" placeholder="Enter password"
                onChange={e => this._setInput(e, 'password') }
              />
              { passwordMessage }
            </label>

            <Button primary onClick={() => {}}>Submit</Button>
          </form>
        </div>

        <Button onClick={ () => alert('Whoops... // TODO!')}>Forgot your password?</Button>
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
    })
  };

  _submitForm = e => {
    e.preventDefault();
    e.stopPropagation();

    const { auth } = this.state;
    const { dispatch } = this.props;

    if (!(this.re.test(auth.username))) {
      this.setState({
        messages: {
          username: 'Please enter a valid username'
        }
      })
      return;
    }

    if (auth.password && auth.password.length > 6) {
      dispatch(tryLogin(auth));
      return;
    }

    this.setState({
      messages: {
        password: 'Please enter a valid password'
      }
    })
  }
}

export default connect()(Login);
