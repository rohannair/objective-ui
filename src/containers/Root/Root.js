import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'

const Root = ({ routes, store, client }) =>
  <ApolloProvider store={ store } client={ client }>
    { routes }
  </ApolloProvider>

Root.propTypes = {
  store: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired
}

export default Root
