import React from 'react';
import { Router, Route, Redirect, IndexRoute, IndexRedirect, browserHistory, applyRouterMiddleware } from 'react-router';

// Layouts
import AuthLayout from '../layouts/AuthLayout';
import CoreLayout from '../layouts/CoreLayout';

// Containers
import Feed from '../containers/Feed';
import Login from '../containers/Login';
import Preferences from '../containers/Preferences';
import Signup from '../containers/Signup';
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

      <Route path="feed" component={Feed} />
      <Route path="squads" component={ SquadList } />
      <Route path="users" component={ UserList } />
      <Route path="settings" component={ Preferences } />
    </Route>
  </Router>
);
