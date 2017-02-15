import React, { Component, PropTypes } from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'

import styles from './Feed.css'
import dateformat from 'dateformat'
import Waypoint from 'react-waypoint'
import debounce from 'lodash/debounce'
import update from 'immutability-helper'

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
import EditSnapshotObjectiveModal from '../../modals/EditSnapshotObjectiveModal'

class Feed extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      viewer: PropTypes.object
    }).isRequired,

    submit: PropTypes.func.isRequired,
    addReaction: PropTypes.func.isRequired,
    deleteReaction: PropTypes.func.isRequired,
    loadMoreSnapshots: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)

    this.defaultEditSnapshotObjectiveState = {
      objectiveId: '',
      query: ''
    }

    this.defaultSnapshotState = {
      id: '',
      name: '',
    }

    this.state = {
      snapshot: this.defaultSnapshotState,
      editSnapshotObjective: this.defaultEditSnapshotObjectiveState
    }

    this.modalAction = { type: 'SHOW_MODAL' }
  }

  toggleReaction(isLiked, id) {
    if (isLiked) return this.props.deleteReaction(1, id)
    return this.props.addReaction(1, id)
  }

  _loadMore = debounce(() => {
    const {snapshots, _snapshotsCount} = this.props.data.viewer
    if (snapshots.length === _snapshotsCount) return
    this.props.loadMoreSnapshots()
  }, 100)

  _renderWaypoint = () => {
    const {snapshots, _snapshotsCount} = this.props.data.viewer
    if (this.props.data.loading && snapshots.length === _snapshotsCount) return
    return (
      <Waypoint
        onEnter={this._loadMore}
        threshold={0.5}
      />
    )
  }

  render() {
    const {dispatch, data: { viewer, loading }} = this.props

    if (loading && !viewer) {
      return <LoadingBar />
    }

    const snapshots = viewer.snapshots && viewer.snapshots.map(snap => {
      const isLiked = snap.reactions.some(r => r && r.user.id === viewer.id)
      return (
        <SnapshotContainer key={snap.id}>
          <SnapshotHeader
            {...snap}
            editObjective = {this._showEditSnapshotObjectiveModal.bind(this, snap)}
          />
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

    const posteableObjectives = viewer.objectives.filter(v => (v.owner && v.owner.id === viewer.id) || (v.collaborators.reduce((acc, c) => c.user.id === viewer.id, false)))

    return (
      <div className={styles.Feed}>
        <div className={styles.body}>
          <div className={styles.feedBody}>
            <SnapshotEditor
              dropdownValues={posteableObjectives}
              submit={this._submit}
            />
              {snapshots}
              {this._renderWaypoint()}
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

  _showModal = (title, label, event, modalComponent) => ({
    ...this.modalAction,
    title,
    action: { label, event },
    modalComponent
  })

  _handleEditSnapshotObjectiveChange = name => val => {
    this.setState(prev => ({
      editSnapshotObjective: {
        ...prev.editSnapshotObjective,
        [name]: val
      }
    }))
  }

  _editSnapshotObjective = () => {
    const { objectiveId } = this.state.editSnapshotObjective
    const { id } = this.state.snapshot
    this.props.editSnapshotObjective(objectiveId, id)
    this.setState({
      editSnapshotObjective: this.defaultEditSnapshotObjectiveState,
      snapshot: this.defaultSnapshotState
    })
  }

  _showEditSnapshotObjectiveModal = ({ name, id }) => this.setState({
    snapshot: { name, id }
  }, () => this.props.dispatch(
        this._showModal(
          'Edit Objective',
          'Edit Objective',
          this._editSnapshotObjective,
          <EditSnapshotObjectiveModal
            onChange={this._handleEditSnapshotObjectiveChange('objectiveId')}
            source={this.props.data.viewer.objectives}
            query={this.state.editSnapshotObjective.query}
            onQueryChange={this._handleEditSnapshotObjectiveChange('query')}
          />
        )
      )
    )
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
              ...prev.viewer.snapshots.slice(0, LIMIT_PER_PAGE - 1)
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

const withEditSnapshotObjectiveMutation = graphql(SnapshotHeader.mutations.editSnapshotObjective, {
  props: ({mutate}) => ({
    editSnapshotObjective: (objectiveId, id) => mutate({
      variables: {
        objectiveId,
        id
      },
      updateQueries: {
        Feed: (prev, { mutationResult }) => {
          const { editSnapshotObjective } = mutationResult.data
          const snapshotIdx = prev.viewer.snapshots.findIndex(s => s.id === editSnapshotObjective.id)
          const prevSnapshot = prev.viewer.snapshots[snapshotIdx]
          const editedSnapshot = update(prevSnapshot, { $merge: { objective: editSnapshotObjective.objective }})
          const snapshots = update(prev.viewer.snapshots, {
            $splice: [[snapshotIdx, 1, editedSnapshot]]
          })
          return update(prev, {
            viewer: {
              snapshots: { $set: snapshots },
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
  query Feed ($first: Int, $offset: Int) {
    viewer {
      id
      img
      firstName
      lastName
      snapshots (first: $first, offset: $offset) {
        id
        body
        img
        ...SnapshotHeaderFragment
        ...SnapshotFooterFragment
      }
      objectives {
        id
        name
        owner {
          id
        }
        collaborators {
          user {
            id
          }
        }
      }
      squads {
        id
        name
      }
      _snapshotsCount
    }
  }
  ${SnapshotHeader.fragments.header}
  ${SnapshotFooter.fragments.footer}
`
const LIMIT_PER_PAGE = 15
const withData = graphql(GET_FEED_QUERY, {
  options: ownProps => ({
    variables: {
      first: LIMIT_PER_PAGE,
      offset: 0
    },
    forceFetch: true
  }),
  props: ({ data, data: { fetchMore, viewer} }) => ({
    data,
    loadMoreSnapshots: () => fetchMore({
      variables: {
        offset: viewer.snapshots.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.data) return prev
        const moreSnaphots = fetchMoreResult.data.viewer.snapshots
        return ({
          ...prev,
          viewer: {
            ...prev.viewer,
            snapshots: [
              ...prev.viewer.snapshots,
              ...moreSnaphots
            ]
          }
        })
      }
    })
  })
})

export default compose(
  withData,
  withMutation,
  withAddReactionMutation,
  withDeleteReactionMutation,
  withEditSnapshotObjectiveMutation,
  connect(state => state.global)
)(Feed)
