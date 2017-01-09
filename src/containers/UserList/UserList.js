// Deps
import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styles from './UserList.css'

// Fragments
import UserMetaFields from '../../fragments/UserMetaFields'

// Components
import Button from '../../components/Button'
import LoadingBar from '../../components/LoadingBar'

import SkyLight from 'react-skylight'
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
    }).isRequired,

    invite: PropTypes.func.isRequired
  }

  render() {
    const { data: { viewer, loading } } = this.props
    if (loading) {
      return <LoadingBar />
    }

    const userCount = viewer.company.users.length
    const userItems = viewer.company.users.map(user =>
      <div className={styles.listItem} key={user.id}>
        <UserCard user={user} />
      </div>)

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

        <SkyLight
          hideOnOverlayClicked
          title="Invite New User"
          ref="dialog"
          dialogStyles={ skylightStyles }
          afterClose={this._clearState}
        >
          <form className={styles.addUserModal} onSubmit={ this._validateInviteUserInputs }>
            <label className={styles.modal__item}>
              <TextInput
                type='email'
                placeholder='Email'
                value={this.state.newUser.email}
                onChange={ val => this.setState({
                  newUser: {
                    ...this.state.newUser,
                    email: val
                  }
                })}
                />
            </label>

            <label className={styles.modal__item}>
              <TextInput
                placeholder='Job Title'
                value={this.state.newUser.jobTitle}
                onChange={ val => this.setState({
                  newUser: {
                    ...this.state.newUser,
                    jobTitle: val
                  }
                })}
                />
            </label>
            <Button primary onClick={ this._validateInviteUserInputs }>Send Invite</Button>
          </form>
        </SkyLight>

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

const NEW_USER_MUTATION = gql`
  mutation inviteUser($email: String!) {
    inviteUser(email: $email) {
      ...UserMetaFields
    }
  }
  ${UserMetaFields}
`

const withMutation = graphql(NEW_USER_MUTATION, {
  props: ({ mutate }) => ({
    invite: (email) => mutate({
      variables: { email },
      optimisticResponse: {
        __typename: 'Mutation',
        inviteUser: {
          __typename: 'User',
          id: Math.random().toString(16).slice(2),
          email,
          firstName: '',
          lastName: '',
          img: '',
          role: '',
          jobTitle: '',
          pending: true
        }
      },

      updateQueries: {
        UserList: (prev, { mutationResult }) => {
          const newUser = mutationResult.data.inviteUser
          return {
            ...prev,
            viewer: {
              ...prev.viewer,
              company: {
                ...prev.viewer.company,
                users: [
                  newUser,
                  ...prev.viewer.company.users
                ]
              }
            }
          }
        }
      }

    })
  })
})

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

export default withData(withMutation(UserList))
