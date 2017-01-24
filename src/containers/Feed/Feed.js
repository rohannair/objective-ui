import React, { Component, PropTypes } from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styles from './Feed.css'
import dateformat from 'dateformat'

// Components
import LoadingBar from '../../components/LoadingBar'
import ObjectiveFeed from '../../components/ObjectiveFeed'
import PageHeader from '../../components/PageHeader'
import SnapshotEditor from '../../components/SnapshotEditor'
import FlipMove from 'react-flip-move'

import SnapshotContainer from '../../components/SnapshotContainer'
import SnapshotHeader from '../../components/SnapshotHeader'
import SnapshotBody from '../../components/SnapshotBody'
import SnapshotFooter from '../../components/SnapshotFooter'

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

  toggleReaction(isLiked, id) {
    if (isLiked) return this.props.deleteReaction(1, id)
    return this.props.addReaction(1, id)
  }

  render() {
    const {data: { viewer, loading }} = this.props

    if (loading && !viewer) {
      return <LoadingBar />
    }

    const snapshots = viewer.snapshots && viewer.snapshots.map(snap => {
      const isLiked = snap.reactions.some(r => r && r.user.id === viewer.id)
      return (
        <SnapshotContainer key={snap.id}>
          <SnapshotHeader {...snap} />
          <SnapshotBody
            className={styles.snapshot__body}
            body={snap.body}
            img={snap.img}
          />
          <SnapshotFooter
            count={snap.reactions.length}
            toggleAction={this.toggleReaction.bind(this, isLiked, snap.id)}
            isLiked={isLiked}
          />
        </SnapshotContainer>
      )
    })

    return (
      <div className={styles.Feed}>
        <PageHeader title="Feed" />
        <div className={styles.body}>
          <div className={styles.feedBody}>
            <SnapshotEditor
              dropdownValues={viewer.objectives}
              submit={this._submit}
            />
              {snapshots}
          </div>
        </div>
      </div>
    )
  };

  _submit = (cb, vals) => {
    const { submit } = this.props
    const { body, blocker, objective, img } = vals
    submit(body, blocker, objective, img)

    cb()
  };
}

const NEW_SNAPSHOT = gql`
  mutation addSnapshot($body: String!, $objective: String, $blocker: Boolean, $img: String) {
    addSnapshot(body: $body, objective: $objective, blocker: $blocker, img: $img) {
      id
      body
      img
      ...SnapshotHeaderFragment
      ...SnapshotFooterFragment
    }
  }
  ${SnapshotHeader.fragments.header}
  ${SnapshotFooter.fragments.footer}
`

const withMutation = graphql(NEW_SNAPSHOT, {
  props: ({ mutate }) => ({
    submit: (body, blocker, objective, img) => mutate({
      variables: { body, blocker, objective, img },
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

const withAddReactionMutation = graphql(SnapshotFooter.mutations.addReaction, {
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

const withDeleteReactionMutation = graphql(SnapshotFooter.mutations.deleteReaction, {
  props: ({ mutate }) => ({
    deleteReaction: (reactionId, snapshotId) => mutate({
      variables: { reactionId, snapshotId },
      updateQueries: {
        Feed: (prev) => {
          const snapshotIdx = prev.viewer.snapshots.findIndex(s => s.id === snapshotId)
          const snapshot = prev.viewer.snapshots[snapshotIdx]
          const reactionIdx = snapshot.reactions.findIndex(r => r.user.id === prev.viewer.id)

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
                    ...snapshot.reactions.slice(reactionIdx + 1)
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
        body
        img
        ...SnapshotHeaderFragment
        ...SnapshotFooterFragment
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
  ${SnapshotHeader.fragments.header}
  ${SnapshotFooter.fragments.footer}
`

const withData = graphql(GET_FEED_QUERY, {
  options: ownProps => ({
    // forceFetch: true
  })
})

export default compose(
  withData,
  withMutation,
  withAddReactionMutation,
  withDeleteReactionMutation
)(Feed)

