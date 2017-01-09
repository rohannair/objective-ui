import React, { Component, PropTypes } from 'react'
import styles from './Login.css'
import { connect } from 'react-redux'

import Button from 'components/Button'
import Card from 'components/Card'

class Login extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { lock } = this.props.route

    return (
      <div className={ styles.loginBox }>
        <Card>
          <div className={ styles.innerLoginBox }>
            <h2>Login</h2>
            <div className={styles.buttonContainer}>
              <Button primary onClick={ lock.login }>Login</Button>
            </div>
          </div>
        </Card>
      </div>

    )
  };
}

const mapStateToProps = state => ({
  global: state.global
})

export default connect(mapStateToProps)(Login)
