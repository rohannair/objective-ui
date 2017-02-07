import React, { PropTypes } from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import styles from './SnapshotHeader.css'

import dateformat from 'dateformat'

import Pill from '../Pill'
import UserTab from '../UserTab'

const SnapshotHeader = styled(({ ...snap, editObjective }) => (
  <div className={snap.className}>
    <UserTab {...snap.user} >
      { snap.objective ?
        <div className={styles.objectiveEditor}>
          <Pill info>{snap.objective.name}</Pill>
           { snap.blocker && <Pill danger><i className={'zmdi zmdi-alert-circle-o'} /> BLOCKER!</Pill>}
          <small>{dateformat(snap.createdAt, 'mmm dd h:MM TT')}</small>
          <label onClick={editObjective} className={styles.editButton}><i className={'zmdi zmdi-edit'}/> edit</label>
        </div>
        :
        <div>
          <label onClick={editObjective} className={styles.addButton}><Pill info> + Add Objective </Pill></label>
          { snap.blocker && <Pill danger><i className={'zmdi zmdi-alert-circle-o'}/> BLOCKER!</Pill>}
          <small>{dateformat(snap.createdAt, 'mmm dd h:MM TT')}</small>
        </div>
      }
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
    mutation editSnapshotObjective($objectiveId: String, $snapshotId: Int!) {
      editSnapshotObjective(objectiveId: $objectiveId, snapshotId: $snapshotId) {
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
