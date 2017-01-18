import React, { PropTypes } from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'

import dateformat from 'dateformat'

import Pill from '../Pill'
import UserTab from '../UserTab'

const SnapshotHeader = styled((snap) => (
  <div className={snap.className}>
    <UserTab {...snap.user} >
      { snap.objective && <Pill info>{snap.objective.name}</Pill>}
      { snap.blocker && <Pill danger><i className={'zmdi zmdi-alert-circle-o'} /> BLOCKER!</Pill>}
      <small>{dateformat(snap.createdAt, 'mmm dd h:MM TT')}</small>
    </UserTab>
  </div>
))`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 10px;
`

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
