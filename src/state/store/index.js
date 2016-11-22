import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { routerReducer } from 'react-router-redux';

import driftLoggerMiddleware from '../middleware/driftIdentifier';
import crashReporterMiddleware from '../middleware/crashReporter';

import reducers from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = (__DEV__)
? createLogger(state => state)
: (() => noop => noop);

const devtools = window.devToolsExtension || (() => noop => noop);

export default function configureStore(initialState = {}, history, client) {
  const store = createStore(
    combineReducers({
      ...reducers,
      apollo: client.reducer(),
      route: routerReducer
    }),
    initialState,
    compose(
      applyMiddleware(client.middleware()),
      applyMiddleware(
        sagaMiddleware,
        loggerMiddleware,
        // driftLoggerMiddleware,
        // crashReporterMiddleware
      ),
      devtools(),
    )
  );

  // Extensions
  sagaMiddleware.run(rootSaga);

  return store;
}
