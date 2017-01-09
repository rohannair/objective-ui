import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styles from './Feed.css'
import dateformat from 'dateformat'

// For the editor state


// Components
import LoadingBar from '../../components/LoadingBar'
import ObjectiveFeed from '../../components/ObjectiveFeed'
import PageHeader from '../../components/PageHeader'
import Snapshot from '../../components/Snapshot'
import SnapshotEditor from '../../components/SnapshotEditor'
import FlipMove from 'react-flip-move'

class Feed extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      viewer: PropTypes.object
    }).isRequired,

    submit: PropTypes.func.isRequired
  }

  render() {
    const { data: { viewer, loading } } = this.props

    if (loading && !viewer) {
      return <LoadingBar />
    }

    const snapshots = viewer.snapshots && viewer.snapshots.map(snap => (
      <Snapshot key={snap.id} snap={snap} showObjective />
    ))

    return (
      <div className={styles.Feed}>
        <PageHeader title="Feed" />
        <div className={styles.body}>

          <div className={styles.feedBody}>
            <SnapshotEditor
              dropdownValues={viewer.objectives}
              submit={this._submit}
            />
            <FlipMove easing="ease-in-out">
              {snapshots}
            </FlipMove>
          </div>
        </div>
      </div>
    )
  };

  _submit = (cb, vals) => {
    const { submit } = this.props
    const { body, blocker, objective } = vals
    submit(body, blocker, objective)

    cb()
  };
}

const NEW_SNAPSHOT = gql`
  mutation addSnapshot($body: String!, $objective: String, $blocker: Boolean) {
    addSnapshot(body: $body, objective: $objective, blocker: $blocker) {
      id
      body
      blocker
      createdAt
      user {
        id
        firstName
        lastName
        img
      }

      objective {
        name
      }
    }
  }
`

const withMutation = graphql(NEW_SNAPSHOT, {
  props: ({ mutate }) => ({
    submit: (body, blocker, objective) => mutate({
      variables: { body, blocker, objective },
      optimisticResponse: {
        __typename: 'Mutation',
        addSnapshot: {
          __typename: 'CheckIn', // TODO: Rename checkin to snapshot
          id: Math.random().toString(16).slice(2),
          body,
          createdAt: Date.now()
        }
      },

      updateQueries: {
        Feed: (prev, { mutationResult}) => ({
          ...prev,
          viewer: {
            ...prev.viewer,
            snapshots: [
              mutationResult.data.addSnapshot,
              ...prev.viewer.snapshots
            ]
          }
        })
      }
    })
  })
})

const GET_FEED_QUERY = gql`
  query Feed {
    viewer {
      id
      img
      firstName
      lastName
      snapshots {
        id
        ...SnapshotFragment
      }
      objectives {
        id
        name
      }
      squads {
        id
        name
      }
    }
  }
  ${Snapshot.fragments.snapshot}
`

const withData = graphql(GET_FEED_QUERY, {
  options: ownProps => ({
    forceFetch: true
  })
})

export default withData(withMutation(Feed))

