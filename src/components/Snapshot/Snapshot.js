import React, { Component, PropTypes } from 'react'
import gql from 'graphql-tag'

import styles from './Snapshot.css'

import dateformat from 'dateformat'

import Pill from '../Pill'
import UserTab from '../UserTab'

/**
 * While this should theoretically be a stateless component, it is
 * being rendered by react-flip-move in the parent, and that lib needs
 * the lifecycle methods
 */
class Snapshot extends Component {
  render() {
    const { snap, showObjective } = this.props
    return (
      <div className={styles.snapshot}>
        <header className={styles.snapshot__head} >
          <UserTab {...snap.user}>
            <small>{dateformat(snap.createdAt, 'mmm dd h:MM TT')}</small>
          </UserTab>
        </header>

        <section
          className={styles.snapshot__body}
          dangerouslySetInnerHTML={{ __html: snap.body }}
        />

        <footer className={styles.snapshot__footer}>
          { snap.blocker && <Pill danger><i className={'zmdi zmdi-alert-triangle'} /> BLOCKER!</Pill>}
          { showObjective && snap.objective && <Pill info>{snap.objective.name}</Pill>}
        </footer>
      </div>
    )
  }
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
    }
    ${UserTab.fragments.user}
  `
}

export default Snapshot
