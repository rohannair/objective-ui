import React, { Children, PropTypes } from 'react'
import gql from 'graphql-tag'

import styles from './ObjectiveFeed.css'

import Snapshot from '../../components/Snapshot'

const ObjectiveFeed = p => {
  if (p.snapshots.length < 1) return <div>Add some snapshots</div>

  return (
    <div className={styles.objectivefeed}>
      { p.snapshots.map(s => <Snapshot key={s.id} snap={s} />)}
    </div>
  )
}

ObjectiveFeed.fragments = {
  feed: gql`
    fragment ObjectiveFeedFragment on Objective {
      snapshots {
        id
        ...SnapshotFragment
      }
    }
    ${Snapshot.fragments.snapshot}
  `
}

export default ObjectiveFeed
