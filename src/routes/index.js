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

export default (store, history) => (
  <Router history={ history }>
    <Route path="/auth" component={ AuthLayout }>
      <IndexRoute component={ Login } />
      <Route path="/login" component={ Login } />
    </Route>
    <Route path="/" component={ CoreLayout }>
      <IndexRoute component={ Dashboard } />
      <Route path="dashboard" component={ Dashboard } />

      <Route path="missions" component={ MissionList } />
      <Route path="missions/:id" component={ MissionView } />
      <Route path="missions/edit/:id" component={ MissionEditor } />
    </Route>
  </Router>
);
