import React from 'react';
import { Router, Route, Redirect, IndexRoute, IndexRedirect, browserHistory, applyRouterMiddleware } from 'react-router';

// Layouts
import AuthLayout from '../layouts/AuthLayout';
import CoreLayout from '../layouts/CoreLayout';

// Containers
import Dashboard from '../containers/Dashboard';
import Login from '../containers/Login';
import Signup from '../containers/Signup';

import Preferences from '../containers/Preferences';
import SquadList from '../containers/SquadList';
import UserList from '../containers/UserList';

// Utils
import { requireAuth, checkAuth, clearToken } from '../utils/auth';

export default (store, history) => (
  <Router history={ history }>
    <Route path="/logout" onEnter={ clearToken }/>

    <Route path="/auth/" component={ AuthLayout } onEnter={ checkAuth }>
      <IndexRedirect to="login" />
      <Route path="login" component={ Login } />
      <Route path="signup" component={ Signup } />
    </Route>

    <Route path="/" component={ CoreLayout } onEnter={ requireAuth }>
      <IndexRoute component={ SquadList } />
      <Redirect from="login" to="auth/login" />
      <Redirect from="signup" to="auth/signup" />

      <Route path="squads" component={ SquadList } />
      <Route path="users" component={ UserList } />
      <Route path="settings" component={ Preferences } />
    </Route>
  </Router>
);
