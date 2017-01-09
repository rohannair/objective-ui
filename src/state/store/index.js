import { createStore, applyMiddleware, compose, combineReducers } from 'redux'

import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger'
import { routerReducer } from 'react-router-redux'

import driftLogger from '../middleware/driftIdentifier'
import crashReporter from '../middleware/crashReporter'

import reducers from '../reducers'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()
const NOOP = () => noop => noop
const loggerMiddleware = (__DEV__)
? createLogger(state => state)
: NOOP

const driftLoggerMiddleware = !(__DEV__)
? driftLogger
: NOOP

const crashReporterMiddleware = !(__DEV__)
? crashReporter
: NOOP

const devtools = window.devToolsExtension || (() => noop => noop)

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
        driftLoggerMiddleware,
        crashReporterMiddleware
      ),
      devtools(),
    )
  )

  // Extensions
  sagaMiddleware.run(rootSaga)

  return store
}
