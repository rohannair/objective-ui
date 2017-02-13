import React, { PropTypes } from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'

import Pill from '../Pill'
import UserTab from '../UserTab'
import ObjectiveTab from '../ObjectiveTab'

const SnapshotHeader = styled((snap) => (
  <div className={snap.className}>
    <UserTab {...snap.user} >
      <ObjectiveTab
      readOnly={snap.readOnly}
      objective={snap.objective}
      editObjective={snap.editObjective}
      blocker={snap.blocker}
      createdAt={snap.createdAt}
      />
    </UserTab>
  </div>
  ))`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 10px;
`

SnapshotHeader.mutations = {
  editSnapshotObjective : gql`
    mutation editSnapshotObjective($objectiveId: String, $id: Int!) {
      editSnapshotObjective(objectiveId: $objectiveId, id: $id) {
        id
        objective {
          name
        }
      }
    }
  `
}

SnapshotHeader.fragments = {
  header: gql`
    fragment SnapshotHeaderFragment on Snapshot {
      createdAt
      blocker
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

export default SnapshotHeader
