import React, { PropTypes } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'

import Reaction from '../Reaction'

const SnapshotFooter = styled(({
  className,
  count,
  toggleAction,
  isLiked,
  readOnly
}) => {
  // if (!count) return <div className={className} />
  return (
    <div className={className}>
      <Reaction
        isLiked={isLiked}
        onClick={toggleAction}
        readOnly={readOnly}
       />
       <span style={{
         fontSize: '0.85em',
         color: '#f36',
         fontWeight: 'bold'
       }}>{ count }</span>
    </div>
  )
})`
  display: flex;
  flex-direction: row;
  border-top: 1px dashed #ddd;
  padding: 15px 10px 0;
  align-items: center;
`

SnapshotFooter.mutations = {
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

SnapshotFooter.fragments = {
  footer: gql`
    fragment SnapshotFooterFragment on Snapshot {
      reactions {
        id
        ...ReactionBoxFragment
      }
    }
    ${Reaction.fragments.reaction}
  `
}

export default SnapshotFooter
