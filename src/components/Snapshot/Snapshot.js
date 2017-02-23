import React, { PropTypes } from 'react'
import gql from 'graphql-tag'

import SnapshotContainer from '../SnapshotContainer'
import SnapshotHeader from '../SnapshotHeader'
import SnapshotBody from '../SnapshotBody'
import SnapshotFooter from '../SnapshotFooter'

const Snapshot = ({
  snap,
  editSnapshotObjective,
  viewer
}) => {
  const isLiked = snap.reactions.some(r => r && r.user.id === viewer.id)

  return (
    <SnapshotContainer key={snap.id}>
      <SnapshotHeader {...snap} editObjective={editSnapshotObjective.bind(this, snap)}/>
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
}

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

Snapshot.mutations = {
  NEW_SNAPSHOT
}

Snapshot.fragments = {
  feed: gql`
    fragment SnapshotFeedFragment on Snapshot {
      id
      body
      bodyJson
      img
      ...SnapshotHeaderFragment
      ...SnapshotFooterFragment
    }
    ${SnapshotHeader.fragments.header}
    ${SnapshotFooter.fragments.footer}
  `
}

export default Snapshot
