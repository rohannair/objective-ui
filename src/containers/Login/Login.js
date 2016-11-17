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
    };
  }

  render() {
    const usernameMessage = this.state.messages.username
    ? <div className="alert">{ this.state.messages.username }</div>
    : undefined;

    const passwordMessage = this.state.messages.password
    ? <div className="alert">{ this.state.messages.password }</div>
    : undefined;

    return (
      <div className={ styles.loginBox }>
        <h2>Log In</h2>

        <form className={styles.loginForm} onSubmit={ this._submitForm }>
          <label className={ styles.formGroup }>
            <TextInput label="Username"
              onChange={this._handleChange.bind(this, 'username')}
              value={this.state.auth.username}
            />
            { usernameMessage }
          </label>

          <label className={ styles.formGroup }>
            <TextInput type="password" label="Password"
              onChange={this._handleChange.bind(this, 'password') }
              value={this.state.auth.password}
            />
            { passwordMessage }
          </label>

          <Button primary onClick={() => {}}>Submit</Button>
        </form>

        { /* <Button onClick={ () => alert('Whoops... // TODO!')}>Forgot your password?</Button> */}
      </div>

    );
  };

  _handleChange = (name, val) => {
    let { auth, messages } = this.state;
    this.setState({
      ...this.state,
      auth: {
        ...auth,
        [name]: val
      },
      messages: {
        ...messages,
        [name]: null
      }
    });
  };

  _submitForm = e => {
    e.preventDefault();
    e.stopPropagation();

    const { auth } = this.state;
    const { dispatch } = this.props;
    if (!validateEmail(auth.username)) {
      this.setState({
        messages: {
          username: 'Please enter a valid username'
        }
      });
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
    });
  }
}

export default connect()(Login);
