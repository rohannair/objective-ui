import React, { Children, PropTypes } from 'react'
import gql from 'graphql-tag'
import { Link } from 'react-router'

import styles from './ObjectiveFeed.css'

import SnapshotEditor from '../SnapshotEditor'
import Snapshot from '../Snapshot'

const ObjectiveFeed = p => {
  const snapshots = (p.snapshots.length < 1)
  ? <EmptyObjectiveFeed />
  : p.snapshots.map(snap => {
    return (
      <Snapshot key={snap.id} snap={snap} editSnapshotObjective={p.editSnapshotObjective} viewer={p.viewer} />
    )
  })

  return (
    <div className={styles.objectivefeed}>
      <SnapshotEditor
        dropdownValues={[p.objective]}
        submit={p.submit}
      />
      { snapshots }
    </div>
  )
}

const EmptyObjectiveFeed = () => (
  <Link to="/feed">Add some snapshots from the Feed</Link>
)

ObjectiveFeed.mutations = {
  NEW_SNAPSHOT: Snapshot.mutations.NEW_SNAPSHOT
}

ObjectiveFeed.fragments = {
  feed: gql`
    fragment ObjectiveFeedFragment on Objective {
      snapshots {
        ...SnapshotFeedFragment
      }
    }
    ${Snapshot.fragments.feed}
  `
}

export default ObjectiveFeed
