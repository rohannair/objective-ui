import React from 'react'
import { Router, Route, Redirect, IndexRoute, IndexRedirect, browserHistory, applyRouterMiddleware } from 'react-router'
import { push } from 'react-router-redux'

// Layouts
import AuthLayout from '../layouts/AuthLayout'
import CoreLayout from '../layouts/CoreLayout'

// Containers
import Feed from '../containers/Feed'
import ObjectiveList from '../containers/ObjectiveList'
import UserList from '../containers/UserList'

import CreateUser from '../containers/CreateUser'
import Login from '../containers/Login'
import Preferences from '../containers/Preferences'
import Signup from '../containers/Signup'

import AuthService from '../utils/AuthService'

// Utils
import { requireAuth, checkAuth, clearToken } from '../utils/auth'
const lock = new AuthService('t1FpGvQBC9DqqbaIzhKedem3yca1CQNB', 'objective.auth0.com')

export default (store, history, lock) => {
  const logout = (nextState, replace) => {
    lock.logout()
    replace('/auth/login')
  }

  return (
    <Router history={ history } >
      <Route path="/logout" onEnter={ logout } />

      <Route path="/auth/" component={ AuthLayout } onEnter={ checkAuth }>
        <IndexRedirect to="login" />
        <Route path="create" component={ CreateUser } lock={lock} />
        <Route path="login" component={ Login } lock={lock} />
        <Route path="signup" component={ Signup } />
      </Route>

      <Route path="/" component={ CoreLayout } onEnter={ requireAuth } >
        <IndexRedirect to="feed" />
        <Redirect from="login" to="auth/login"  />
        <Redirect from="signup" to="auth/signup" />

        <Route path="feed" component={ Feed } />
        <Route path="objectives" component={ ObjectiveList } />
        <Route path="users" component={ UserList } />
        <Route path="settings" component={ Preferences } />
      </Route>
    </Router>
  )
}
