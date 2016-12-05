import React, { Component, PropTypes } from 'react';
import styles from './Login.css';
import { connect } from 'react-redux';

import TextInput from 'components/Forms/TextInput';
import Alert from 'components/Alert';
import Button from 'components/Button';
import Card from 'components/Card';

import { validateEmail } from 'utils';
import { tryLogin, tryPasswordReset } from 'state/actions/auth.actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forgotPassword: false,
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
    const { forgotPassword } = this.state;
    const passwordBox = !forgotPassword
    ? (<label className={ styles.formGroup }>
        <TextInput type="password" label="Password"
          onChange={this._handleChange.bind(this, 'password') }
          value={this.state.auth.password}
        />
        { passwordMessage }
      </label>)
    : null;

    const mainError = this._getMainMessage(this.props.global.message);

    const usernameMessage = this.state.messages.username
    ? <div className="alert">{ this.state.messages.username }</div>
    : null;

    const passwordMessage = this.state.messages.password
    ? <div className="alert">{ this.state.messages.password }</div>
    : null;

    const onSubmit = forgotPassword
    ? this._resetPassword
    : this._submitForm;

    return (
      <div className={ styles.loginBox }>
        <Card>
          <div className={ styles.innerLoginBox }>
            <h2>
              {
                forgotPassword
                ? 'Forgot Password'
                : 'Log In'
              }
            </h2>
            <form className={styles.loginForm} onSubmit={ onSubmit }>
              <label className={ styles.formGroup }>
                <TextInput label="Username"
                  onChange={this._handleChange.bind(this, 'username')}
                  value={this.state.auth.username}
                />
                { usernameMessage }
              </label>

              { passwordBox }

              { mainError }
              <div className={styles.buttonContainer}>
                <Button primary onClick={() => {}}>Submit</Button>
              </div>
            </form>
          </div>
        </Card>

        <footer className={styles.forgotpasswordContainer}>
          <span
            className={styles.forgotpassword}
            onClick={ () => this.setState({forgotPassword: !forgotPassword})}
          >
            { forgotPassword
              ? '<-- Return to login'
              : 'Forgot your password?'
            }
          </span>
        </footer>
      </div>

    );
  };

  _getMainMessage = (message) => {
    const { body, status } = message;
    if (!body) return null;

    return status
    ? <Alert type="danger">{body}</Alert>
    : <Alert type="success">{body}</Alert>;
  }

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

  _resetPassword = e => {
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

    dispatch(tryPasswordReset(auth));
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

const mapStateToProps = state => ({
  global: state.global
});

export default connect(mapStateToProps)(Login);
