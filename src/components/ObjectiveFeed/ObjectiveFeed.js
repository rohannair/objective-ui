import React, { Children, PropTypes } from 'react'
import gql from 'graphql-tag'
import { Link } from 'react-router'

import styles from './ObjectiveFeed.css'

import SnapshotContainer from '../SnapshotContainer'
import SnapshotHeader from '../SnapshotHeader'
import SnapshotBody from '../SnapshotBody'
import SnapshotFooter from '../SnapshotFooter'
import SnapshotEditor from '../SnapshotEditor'

const ObjectiveFeed = p => {
  const snapshots = (p.snapshots.length < 1)
  ? <EmptyObjectiveFeed />
  : p.snapshots.map(snap => {
    const isLiked = snap.reactions.some(r => r && r.user.id === p.viewer.id)
    return (
      <SnapshotContainer key={snap.id}>
        <SnapshotHeader {...snap} editObjective={p.editSnapshotObjective.bind(this, snap)}/>
        <SnapshotBody
          img={snap.img}
          body= {snap.body }
          bodyJson={snap.bodyJson}
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

const NEW_SNAPSHOT = gql`
  mutation addSnapshot($bodyJson: String, $objective: String, $blocker: Boolean, $img: String) {
    addSnapshot(bodyJson: $bodyJson, objective: $objective, blocker: $blocker, img: $img) {
      id
      body
      bodyJson
      img
      ...SnapshotHeaderFragment
      ...SnapshotFooterFragment
    }
  }
  ${SnapshotHeader.fragments.header}
  ${SnapshotFooter.fragments.footer}
`

ObjectiveFeed.mutations = {
  NEW_SNAPSHOT
}

ObjectiveFeed.fragments = {
  feed: gql`
    fragment ObjectiveFeedFragment on Objective {
      snapshots {
        id
        body
        bodyJson
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
