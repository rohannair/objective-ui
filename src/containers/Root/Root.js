import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

const Root = ({ routes, store }) =>
  <Provider store={ store }>
    { routes }
  </Provider>;

Root.propTypes = {
  store: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired
};

export default Root;
