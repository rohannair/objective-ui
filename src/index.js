// Setting up Sentry Logging
const Raven = window.Raven
Raven && Raven.config('https://e588c23d6c4842dfadb1a8e06fafe380@sentry.io/114849').install()

import 'babel-polyfill'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { AppContainer as HotLoaderContainer } from 'react-hot-loader'
import FontFaceObserver from 'fontfaceobserver'

import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import ApolloClient, { createNetworkInterface } from 'apollo-client'

import Root from './containers/Root'
const ROOT_NODE = document.getElementById('app')

import reducers from './state/reducers'
import configureStore from './state/store'
import configureRoutes from './routes/index'

import { getToken } from './utils/auth'
import AuthService from './utils/AuthService'

const auth = new AuthService('t1FpGvQBC9DqqbaIzhKedem3yca1CQNB', 'objective.auth0.com')

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'api/graphql'
  })
})

client.networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = new Headers()
    }

    req.options.headers.Authorization = `Bearer ${getToken()}`
    next()
  }
}])

client.networkInterface.useAfter([{
  applyAfterware({ response }, next) {
    if (response.status === 401) {
      auth.logout()
    }
    next()
  }
}])

const store = configureStore({}, browserHistory, client)

const history = syncHistoryWithStore(
  browserHistory,
  store,
  {
    selectLocationState(state) {
      return state.route
    }
  }
)

const routes = configureRoutes(store, history, auth)
let render = () => {
  ReactDOM.render(
    <HotLoaderContainer>
      <Root store={ store } routes={ routes } client={ client } />
    </HotLoaderContainer>,
    ROOT_NODE
  )
}

if (__DEV__) {
  if (module.hot) {
    const renderApp = render
    const renderError = error => {
      const RedBox = require('redbox-react').default
      ReactDOM.render(<RedBox error={error} />, ROOT_NODE)
    }

    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error)
        renderApp()
      }
    }

    module.hot.accept('containers/Root', () => {
      const NextRoot = require('containers/Root').default

      render = () => {
        ReactDOM.render(
          <HotLoaderContainer>
            <NextRoot store={ store } routes={ routes } client={ client } />
          </HotLoaderContainer>,
          ROOT_NODE
        )
      }

      setTimeout(() => {
        render()
      })
    })
  }
}

const roboto = new FontFaceObserver('Roboto')
roboto.load().then(render)
