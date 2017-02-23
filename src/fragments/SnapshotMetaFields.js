import gql from 'graphql-tag'
import SnapshotHeader from '../components/SnapshotHeader'
import SnapshotFooter from '../components/SnapshotFooter'


export default gql`
  fragment SnapshotMetaFields on Snapshot {
    id
    body
    img
    ...SnapshotHeaderFragment
    ...SnapshotFooterFragment
  }
  ${SnapshotHeader.fragments.header}
  ${SnapshotFooter.fragments.footer}
`
