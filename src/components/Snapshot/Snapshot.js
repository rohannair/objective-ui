import React, { Component, PropTypes } from 'react'
import gql from 'graphql-tag'

import styles from './Snapshot.css'

import dateformat from 'dateformat'

import Pill from '../Pill'
import UserTab from '../UserTab'
import Reaction from '../Reaction'

/**
 * While this should theoretically be a stateless component, it is
 * being rendered by react-flip-move in the parent, and that lib needs
 * the lifecycle methods
 */
class Snapshot extends Component {
  static defaultProps = {
    viewer: { id: null },
    deleteReaction: () => {},
    addReaction: () => {},
  }

  render() {
    const { viewer: { id: viewerId }, snap, showObjective, addReaction, deleteReaction } = this.props
    const isLiked = snap.reactions && snap.reactions.reduce((val, reaction) => reaction.user.id === viewerId, false)

    return (
      <div className={styles.snapshot}>
        <header className={styles.snapshot__head} >
          <UserTab {...snap.user}>
            { showObjective && snap.objective && <Pill info>{snap.objective.name}</Pill>}
            { snap.blocker && <Pill danger><i className={'zmdi zmdi-alert-triangle'} /> BLOCKER!</Pill>}
            <small>{dateformat(snap.createdAt, 'mmm dd h:MM TT')}</small>
          </UserTab>
        </header>

        <section
          className={styles.snapshot__body}
          dangerouslySetInnerHTML={{ __html: snap.body }}
        />

        <footer className={styles.snapshot__footer}>
          <Reaction
            isLiked={isLiked}
            onClick={
              isLiked
              ? deleteReaction.bind(this, 1, snap.id)
              : addReaction.bind(this, 1, snap.id)
            }
           />
           <span style={{
             fontSize: '0.85em',
             color: '#f36',
             fontWeight: 'bold'
           }}>{ snap.reactions && snap.reactions.length}</span>
        </footer>
      </div>
    )
  }
}

Snapshot.mutations = {
  addReaction: gql`
    mutation addReaction($reactionId: Int!, $snapshotId: Int!) {
      addReaction(reactionId: $reactionId, snapshotId: $snapshotId) {
        id
        ...ReactionBoxFragment
      }
    }
    ${Reaction.fragments.reaction}
  `,

  deleteReaction: gql`
    mutation deleteReaction($reactionId: Int!, $snapshotId: Int!) {
      deleteReaction(reactionId: $reactionId, snapshotId: $snapshotId) {
        id
      }
    }
  `
}

Snapshot.fragments = {
  snapshot: gql`
    fragment SnapshotFragment on Snapshot {
      body
      blocker
      createdAt
      objective {
        name
      }
      user {
        id
        ...UserTabFragment
      }
      reactions {
        id
        ...ReactionBoxFragment
      }

    }
    ${UserTab.fragments.user}
    ${Reaction.fragments.reaction}
  `
}

export default Snapshot
