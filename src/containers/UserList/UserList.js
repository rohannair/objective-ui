// Deps
import React, { Component, PropTypes } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router'

import styles from './UserList.css'

// Fragments
import UserMetaFields from '../../fragments/UserMetaFields'

// Components
import Button from '../../components/Button'
import LoadingBar from '../../components/LoadingBar'

import TextInput from '../../components/Forms/TextInput'
import UserCard from '../../components/UserCard'

// Utilities
import { validateEmail } from '../../utils'

class UserList extends Component {
  constructor(props) {
    super(props)
    this.userListDefaultState = {
      newUser: {
        email: '',
        jobTitle: ''
      }
    }

    this.state = { ...this.userListDefaultState }
  };

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      viewer: PropTypes.object
    }).isRequired
  }

  render() {
    const { data: { viewer, loading } } = this.props
    if (loading) {
      return <LoadingBar />
    }

    const userCount = viewer.company.users.length
    const userItems = viewer.company.users.map(user =>
      <Link to={`/users/${user.id}`} className={styles.listItem} key={user.id}>
        <UserCard user={user} />
      </Link>)

    const skylightStyles = {
      width: '40%',
      height: 'static',
      marginLeft: '-20%',
      marginTop: '0',
      top: '20%',
      padding: '30px'
    }

    const inviteUserButton = undefined

    return (
      <div className={styles.UserList}>
        <div className={styles.controlBar}>
          <h2>Users</h2>
          <div className={styles.buttonContainer}>
            &nbsp;&nbsp;
            { inviteUserButton }
          </div>
        </div>

        <div className={styles.cardContainer}>
          { userItems }
        </div>

      </div>
    )
  };

  _clearState = () => this.setState({
    ...this.userListDefaultState
  });

  _showInviteUserModal = (e) => {
    e.preventDefault()
    this.refs.dialog.show()
  };

  _validateInviteUserInputs = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const { newUser: { email, jobTitle } } = this.state
    const { dispatch } = this.props

    if (!validateEmail(email) || !jobTitle) return console.error('Not an email!')

    // Dispatch action
    const { invite } = this.props
    invite(email)

    // Close Modal
    this.refs.dialog.hide()
  };
}

const GET_USER_QUERY = gql`
  query UserList {
    viewer {
      id
      role
      company {
        id
        users {
          ...UserMetaFields
          squads {
            id
            name
          }
          objectives {
            id
          }
        }
      }
    }
  }
  ${UserMetaFields}
`

const withData = graphql(GET_USER_QUERY)

export default compose(withData)(UserList)
