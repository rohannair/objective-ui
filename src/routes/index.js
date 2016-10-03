import React from 'react';
import { Router, Route, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router';
import useScroll from 'react-router-scroll/lib/useScroll';

// Layouts
import CoreLayout from 'layouts/CoreLayout';
import PublishedLayout from 'layouts/PublishedLayout';

// Containers
import Dashboard from 'containers/Dashboard';
import MissionEditor from 'containers/MissionEditor';
import MissionViewer from 'containers/MissionViewer';

export default (store, history) => (
  <Router history={ history } render={ applyRouterMiddleware(useScroll()) }>
    <Route path="/" component={ CoreLayout }>
      <IndexRoute component={ Dashboard } />
      <Route path="dashboard" component={ Dashboard } />
      <Route path="missions/edit" component={ MissionEditor } />
      <Route path="missions/view" component={ MissionViewer } />
    </Route>
  </Router>
);
