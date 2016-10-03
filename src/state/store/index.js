import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from 'state/reducers';
import createLogger from 'redux-logger';

import rootSaga from 'state/sagas';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = (__DEV__)
? createLogger({
  stateTransformer: state => state && state.toJS()
})
: (() => noop => noop);

const devtools = window.devToolsExtension || (() => noop => noop);

export default function configureStore(initialState = {}, history) {
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  // 3. loggerMiddleware: Logs messages to console in dev
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    loggerMiddleware,
    createSagaMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    devtools(),
  ];

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    compose(...enhancers)
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.runSaga(rootSaga);

  // Make reducers hot reloadable
  if (__DEV__ && module.hot) {
    module.hot.accept('state/reducers', () => {
      const nextReducers = createReducers();
      store.replaceReducer(nextReducers);
    });
  }

  return store;
}
