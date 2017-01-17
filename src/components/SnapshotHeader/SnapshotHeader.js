import React, { PropTypes } from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'

import dateformat from 'dateformat'

import Pill from '../Pill'
import UserTab from '../UserTab'

const SnapshotHeader = styled((snap) => (
  <UserTab {...snap.user} className={snap.className}>
    { snap.objective && <Pill info>{snap.objective.name}</Pill>}
    { snap.blocker && <Pill danger><i className={'zmdi zmdi-alert-triangle'} /> BLOCKER!</Pill>}
    <small>{dateformat(snap.createdAt, 'mmm dd h:MM TT')}</small>
  </UserTab>
))`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
