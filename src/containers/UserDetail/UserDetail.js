import React, { Component, PropTypes } from 'react'
import styles from './UserDetail.css'

import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import UserMetaFields from '../../fragments/UserMetaFields'
import SnapshotMetaFields from '../../fragments/SnapshotMetaFields'
import LoadingBar from '../../components/LoadingBar'
import ControlBar from '../../components/ControlBar'
import Snapshot from '../../components/Snapshot'


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
    const { loading, viewer } = this.props.data

    if (loading && !viewer) {
      return <LoadingBar />
    }

    const { user } = viewer.company

    const snapshots = user.snapshots.map(snap => (
      <Snapshot key={snap.id} snap={snap} editSnapshotObjective={() => {}} viewer={viewer} />
    ))

    return (
      <div className={styles.userdetail}>
        <ControlBar>
          Profile

          <div className={styles.buttonContainer}>
          </div>
        </ControlBar>

        <div className={styles.container}>
          { /* user avatar */ }

          <div className={styles.avatarContainer}>
            <div className={styles.card}>
              <img src={user.img} className={styles.avatar} />

              <h3 className={styles.name}>{user.firstName} {user.lastName}</h3>

              <span className={styles.jobTitle}>
                {user.jobTitle}
              </span>
            </div>
          </div>

          <div className={styles.snapshotContainer}>
            { snapshots }
          </div>


        </div>
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
            ...SnapshotFeedFragment
          }
        }
      }
    }
  }
  ${UserMetaFields}
  ${Snapshot.fragments.feed}
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
