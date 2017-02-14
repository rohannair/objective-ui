import React, { Children, PropTypes } from 'react'
import gql from 'graphql-tag'
import { Link } from 'react-router'

import styles from './ObjectiveFeed.css'

import SnapshotContainer from '../SnapshotContainer'
import SnapshotHeader from '../SnapshotHeader'
import SnapshotBody from '../SnapshotBody'
import SnapshotFooter from '../SnapshotFooter'

const ObjectiveFeed = p => {
  const snapshots = (p.snapshots.length < 1)
  ? <EmptyObjectiveFeed />
  : p.snapshots.map(snap => {
    const isLiked = snap.reactions.some(r => r && r.user.id === p.viewer.id)
    return (
      <SnapshotContainer key={snap.id}>
        <SnapshotHeader {...snap} readOnly />
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

  return (
    <div className={styles.objectivefeed}>
      { snapshots }
    </div>
  )
}

const EmptyObjectiveFeed = () => (
  <Link to="/feed">Add some snapshots from the Feed</Link>
)

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
