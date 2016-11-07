import React from 'react';
import { Router, Route, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router';
// import useScroll from 'react-router-scroll/lib/useScroll';

// Layouts
import AuthLayout from '../layouts/AuthLayout';
import CoreLayout from '../layouts/CoreLayout';

// Containers
import Dashboard from '../containers/Dashboard';
import Login from '../containers/Login';
import MissionEditor from '../containers/MissionEditor';
import MissionList from '../containers/MissionList';
import MissionView from '../containers/MissionView';
import SquadList from '../containers/SquadList';
import UserList from '../containers/UserList';
import UserEditor from '../containers/UserEditor';

// Utils
import { requireAuth, checkAuth } from '../utils/auth';

export default (store, history) => (
  <Router history={ history }>
    <Route path="/auth" component={ AuthLayout } onEnter={ checkAuth }>
      <IndexRoute component={ Login } />
      <Route path="/login" component={ Login } />
      <Route path="/logout" component={ Login } />
    </Route>

    <Route path="/" component={ CoreLayout } onEnter={ requireAuth }>
      <IndexRoute component={ SquadList } />
      <Route path="dashboard" component={ Dashboard } />

      <Route path="missions" component={ MissionList } />
      <Route path="missions/:id" component={ MissionView } />
      <Route path="missions/edit/:id" component={ MissionEditor } />

      <Route path="squads" component={ SquadList } />

      <Route path="users" component={ UserList } />
      <Route path="users/:id" component={ UserEditor } />
    </Route>
  </Router>
);
