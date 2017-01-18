import React, { Children, PropTypes } from 'react'
import gql from 'graphql-tag'

import styles from './ObjectiveFeed.css'

// import Snapshot from '../../components/Snapshot'

import SnapshotContainer from '../../components/SnapshotContainer'
import SnapshotHeader from '../../components/SnapshotHeader'
import SnapshotBody from '../../components/SnapshotBody'
import SnapshotFooter from '../../components/SnapshotFooter'

const ObjectiveFeed = p => {
  if (p.snapshots.length < 1) return <div>Add some snapshots</div>

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

  return (
    <div className={styles.objectivefeed}>
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
