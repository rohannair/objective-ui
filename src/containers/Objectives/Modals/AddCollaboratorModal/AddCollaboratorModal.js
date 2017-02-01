import React from 'react'
import { withApollo } from 'react-apollo'
import ApolloClient from 'apollo-client'
import gql from 'graphql-tag'

import AutocompleteDropDown from '../../../../components/Forms/AutocompleteDropDown'

const AddCollaboratorModal = (props) => {
  const SEARCH_USERS = gql`
  query searchUsers($q: String!) {
    viewer {
      users(q: $q) {
        id, firstName, lastName
      }
    }
  }
`

  const _searchQuery = (q) => {
    return props.client.query({
      query: SEARCH_USERS,
      variables: {
        q: q
      },
    })
    .then(data => {
      const users = [...data.data.viewer.users]
    })
  }

  return (
    <div>
      <AutocompleteDropDown
        label="Collaborator email"
        onChange={() => console.log}
        onQueryChange={_searchQuery}
        value={props.email}
        source={props.users}
      />
    </div>
  )
}

AddCollaboratorModal.propTypes = { client: React.PropTypes.instanceOf(ApolloClient).isRequired }

export default withApollo(AddCollaboratorModal)
