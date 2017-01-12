import React, { Component, PropTypes } from 'react'
import { compose, graphql } from 'react-apollo'
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

    submit: PropTypes.func.isRequired,
    addReaction: PropTypes.func.isRequired,
    deleteReaction: PropTypes.func.isRequired
  }

  render() {
    const { data: { viewer, loading }, addReaction, deleteReaction } = this.props

    if (loading && !viewer) {
      return <LoadingBar />
    }

    const snapshots = viewer.snapshots && viewer.snapshots.map(snap => (
      <Snapshot addReaction={addReaction} deleteReaction={deleteReaction} key={snap.id} snap={snap} showObjective viewer={viewer} />
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

const withAddReactionMutation = graphql(Snapshot.mutations.addReaction, {
  props: ({ mutate }) => ({
    addReaction: (reactionId, snapshotId) => mutate({
      variables: { reactionId, snapshotId },
      optimisticResponse: {
        __typename: 'Mutation',
        addReaction: {
          __typename: 'Reaction',
          id: Math.random().toString(16).slice(2),
          name: 'like',
          user: {}
        }
      },
      updateQueries: {
        Feed: (prev, { mutationResult}) => {
          const snapshotIdx = prev.viewer.snapshots.findIndex(s => s.id === snapshotId)
          return ({
            ...prev,
            viewer: {
              ...prev.viewer,
              snapshots: [
                ...prev.viewer.snapshots.slice(0, snapshotIdx),
                {
                  ...prev.viewer.snapshots[snapshotIdx],
                  reactions: [
                    ...prev.viewer.snapshots[snapshotIdx].reactions,
                    mutationResult.data.addReaction,
                  ]
                },
                ...prev.viewer.snapshots.slice(snapshotIdx + 1),
              ]
            }
          })
        }
      }
    })
  })
})

const withDeleteReactionMutation = graphql(Snapshot.mutations.deleteReaction, {
  props: ({ mutate }) => ({
    deleteReaction: (reactionId, snapshotId) => mutate({
      variables: { reactionId, snapshotId },
      updateQueries: {
        Feed: (prev, { mutationResult}) => {
          const snapshotIdx = prev.viewer.snapshots.findIndex(s => s.id === snapshotId)
          const snapshot = prev.viewer.snapshots[snapshotIdx]

          // I need to find the index of the reaction
          const reactionIdx = snapshot.reactions.findIndex(r => r.id === mutationResult.data.deleteReaction.id)
          return ({
            ...prev,
            viewer: {
              ...prev.viewer,
              snapshots: [
                ...prev.viewer.snapshots.slice(0, snapshotIdx),
                {
                  ...snapshot,
                  reactions: [
                    ...snapshot.reactions.slice(0, reactionIdx),
                    ...snapshot.reactions.slice(reactionIdx, 1),
                    ,
                  ]
                },
                ...prev.viewer.snapshots.slice(snapshotIdx + 1),
              ]
            }
          })
        }
      }
    }),
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

export default compose(
  withData,
  withMutation,
  withAddReactionMutation,
  withDeleteReactionMutation
)(Feed)

