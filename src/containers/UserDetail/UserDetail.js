import React, { Component, PropTypes } from 'react'
import styles from './UserDetail.css'

import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import UserMetaFields from '../../fragments/UserMetaFields'
import SnapshotMetaFields from '../../fragments/SnapshotMetaFields'

class UserDetail extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      viewer: PropTypes.object,
    }).isRequired
  };
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.userdetail}>
      </div>
    )
  }
}

const GET_USER_QUERY = gql`
  query UserDetail($id: String!) {
    viewer {
      id
      role
      company {
        id
        user(id: $id) {
          ...UserMetaFields
          objectives {
            id
          }
          snapshots {
            ...SnapshotMetaFields
          }
        }
      }
    }
  }
  ${UserMetaFields}
  ${SnapshotMetaFields}
`

const withData = graphql(GET_USER_QUERY, {
  options: ({ params : { userId } }) => ({
    variables: {
      id: userId
    },
    forceFetch: true
  })
})

export default compose(withData)(UserDetail)
