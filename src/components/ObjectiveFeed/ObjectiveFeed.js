import React, { Children, PropTypes } from 'react'
import gql from 'graphql-tag'
import { Link } from 'react-router'

import styles from './ObjectiveFeed.css'

// import Snapshot from '../../components/Snapshot'

import Alert from '../Alert'
import SnapshotContainer from '../SnapshotContainer'
import SnapshotHeader from '../SnapshotHeader'
import SnapshotBody from '../SnapshotBody'
import SnapshotFooter from '../SnapshotFooter'

const ObjectiveFeed = p => {
  if (p.snapshots.length < 1) return <Link to="/feed">Add some snapshots from the Feed</Link>

  const snapshots = p.snapshots.map(snap => {
    const isLiked = snap.reactions.some(r => r && r.user.id === p.viewer.id)
    return (
      <SnapshotContainer key={snap.id}>
        <SnapshotHeader {...snap} />
        <SnapshotBody
          img={snap.img}
          body= {snap.body }
        />
        <SnapshotFooter
          count={snap.reactions.length}
          isLiked={isLiked}
          readOnly
        />
      </SnapshotContainer>
    )
  })

  const hasNoOwner = !p.owner
  return (
    <div className={styles.objectivefeed}>
      {
        hasNoOwner && (
          <Alert type="warn">This objective has no owner. To claim it as your own, click the <strong>?</strong> above</Alert>
        )
      }
      { snapshots }
    </div>
  )
}

ObjectiveFeed.fragments = {
  feed: gql`
    fragment ObjectiveFeedFragment on Objective {
      snapshots {
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
}

export default ObjectiveFeed
