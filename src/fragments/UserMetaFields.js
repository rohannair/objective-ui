import gql from 'graphql-tag'

export default gql`
  fragment UserMetaFields on User {
    id
    email
    firstName
    lastName
    img
    role
    jobTitle
    pending
  }
`
