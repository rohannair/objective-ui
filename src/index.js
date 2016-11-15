import 'babel-polyfill';

// Setting up Sentry Logging
const Raven = window.Raven;
Raven && Raven.config('https://e588c23d6c4842dfadb1a8e06fafe380@sentry.io/114849').install();

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotLoaderContainer } from 'react-hot-loader';

import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Root from './containers/Root';
const ROOT_NODE = document.getElementById('app');

import reducers from './state/reducers';
import configureStore from './state/store';
import configureRoutes from './routes/index';

const store = configureStore({}, browserHistory);
const history = syncHistoryWithStore(
  browserHistory,
  store,
  {
    selectLocationState(state) {
      return state.get('route').toJS();
    }
  }
);
const routes = configureRoutes(store, history);

let render = () => {
  ReactDOM.render(
    <HotLoaderContainer>
      <Root store={ store } routes={ routes } />
    </HotLoaderContainer>,
    ROOT_NODE
  );
};

if (__DEV__) {
  if (module.hot) {
    const renderApp = render;
    const renderError = error => {
      const RedBox = require('redbox-react').default;
      ReactDOM.render(<RedBox error={error} />, ROOT_NODE);
    };

    render = () => {
      try {
        renderApp();
      } catch (error) {
        console.error(error);
        renderApp();
      }
    };

    module.hot.accept('containers/Root', () => {
      const NextRoot = require('containers/Root').default;

      render = () => {
        ReactDOM.render(
          <HotLoaderContainer>
            <NextRoot store={ store } routes={ routes } />
          </HotLoaderContainer>,
          ROOT_NODE
        );
      };

      setTimeout(() => {
        render();
      });
    });
  }
}

render();
