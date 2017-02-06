import React, { Component, PropTypes } from 'react'
import styles from './Objectives.css'

import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import update from 'immutability-helper'
import { timestamp } from '../../utils/dates'

import LoadingBar from '../../components/LoadingBar'
import ObjectiveFeed from '../../components/ObjectiveFeed'
import ObjectiveHeader from '../../components/ObjectiveHeader'
import ObjectiveCollaboratorBar from '../../components/ObjectiveCollaboratorBar'
import ObjectivesSidebar from '../../components/ObjectivesSidebar'
import ObjectiveSidebarList from '../../components/ObjectiveSidebarList'
import ObjectiveAdmin from '../../components/ObjectiveAdmin'


import Button from '../../components/Button'

import { StyledButton } from '../../components/Button/Button'

import { ObjectiveChangeModal, SetOwnerModal } from './Modals'
import AddCollaboratorModal from './Modals/AddCollaboratorModal'

class Objectives extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      viewer: PropTypes.object,
    }).isRequired,
    createObjective: PropTypes.func.isRequired,
    editObjective: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)

    this.defaultObjectiveState = {
      id: '',
      name: '',
      endsAt: timestamp(),
      isPrivate: false
    }

    this.defaultAddCollaboratorState = {
      id: '',
      query: ''
    }

    this.state = {
      objective: this.defaultObjectiveState,
      addCollaborator: this.defaultAddCollaboratorState
    }
    this.modalAction = { type: 'SHOW_MODAL' }
  }

  render() {
    const { dispatch, data: { viewer, loading } } = this.props
    const isOwner = viewer && viewer.objective && viewer.objective.owner && viewer.objective.owner.id === viewer.id

    if (loading && !viewer) {
      return <LoadingBar />
    }

    return (
      <div className={styles.mainContainer}>
        <ObjectivesSidebar>
          <h3>{viewer.company.name}</h3>
          <ObjectiveSidebarList list={viewer.objectives} getObjective={this._getObjective}/>
          <div className={styles.buttonContainer}>
            <StyledButton
              secondary
              squared
              onClick={this._showNewObjectiveModal}
            >+</StyledButton>
          </div>
        </ObjectivesSidebar>

        <div className={styles.objectivelist}>
          <ObjectiveHeader
            menuLeft
            objective={viewer.objective}
            dropdownOptions={[
              { name: 'Edit', onClick: e => this._showEditObjectiveModal(viewer.objective), icon: 'edit' }
            ]}
          />
          <ObjectiveCollaboratorBar
            objective={viewer.objective}
            setOwner={this._showSetOwnerModal}
            addCollaborator={ this._showAddCollaboratorModal }
            isOwner={isOwner}
          />

          <ObjectiveAdmin
            isOwner={isOwner}
            onPrivateChange={this._handleObjectivePrivacyChange.bind(this)}
            objective={viewer.objective}/>

          <div className={styles.body}>
            { viewer.objective && <ObjectiveFeed {...viewer.objective} viewer={viewer} /> }
          </div>
        </div>
      </div>
    )
  }

  _claimOwnership = (owner) => {
    const { editObjective, data: {viewer} } = this.props
    editObjective({
      objective: {
        ...viewer.objective,
        owner: viewer.id
      }
    })
  }

  _addCollaborator = () => {
    const { addCollaborator: { id } } = this.state
    const objectiveId = this.props.data.viewer.objective.id

    this.props.addCollaborator(objectiveId, id)
    this.setState({
      addCollaborator: this.defaultAddCollaboratorState
    })
  }

  _createNewObjective = () => {
    const { objective } = this.state
    this.props.createObjective({ objective })

    this.setState({
      objective: this.defaultObjectiveState
    })
  }

  _editObjective = () => {
    const { objective } = this.state
    this.props.editObjective({ objective })

    this.setState({
      objective: this.defaultObjectiveState
    })
  }

  _getObjective = (id) => {
    this.props.data.refetch({ id })
  }

  _handleObjectivePrivacyChange = (isPrivate) => {
    const objective = {
      ...this.props.data.viewer.objective,
      isPrivate: isPrivate
    }
    this.props.editObjective({objective})
  }

  _handleObjectiveChange = (name) => val => {
    this.setState(prev => ({
      objective: {
        ...prev.objective,
        [name]: name === 'endsAt' ? timestamp(val) : val
      }
    }))
  }

  _handleAddCollaboratorChange = (name) => val => {
    this.setState(prev => ({
      addCollaborator: {
        ...prev.addCollaborator,
        [name]: val
      }
    }))
  }

  _setOwner = () => {
    this.setState(prev => ({
      settingOwner: !prev.settingOwner
    }))
  }

  _showModal = (title, label, event, modalComponent) => ({
    ...this.modalAction,
    title,
    action: { label, event },
    modalComponent
  })

  _showAddCollaboratorModal = () =>
    this.props.dispatch(
      this._showModal(
        'Add Collaborator',
        'Add Collaborator',
        this._addCollaborator,
        <AddCollaboratorModal
          onChange={this._handleAddCollaboratorChange('id')}
          source={this._getAvailableUsers()}
          query={this.state.addCollaborator.query}
          onQueryChange={(this._handleAddCollaboratorChange('query'))}
        />
      )
    )

  _getAvailableUsers = () => {
    const users = this.props.data.viewer.company.users
    const collaborators = this.props.data.viewer.objective.collaborators.map(c => c.user.id)
    return users.filter(u => {
      return collaborators.indexOf(u.id) < 0
    })
  }

  _showNewObjectiveModal = () => this.props.dispatch(
    this._showModal(
      'Create New Objective',
      'Create Objective',
      this._createNewObjective,
      <ObjectiveChangeModal
        onChange={this._handleObjectiveChange}
        defaultName={this.state.objective.name}
        defaultEndsAt={this.state.objective.endsAt}
      />
    ))

  _showEditObjectiveModal = ({id, name, endsAt}) => this.setState({
    objective: { id, name, endsAt }
  }, () => this.props.dispatch(
    this._showModal(
      'Edit Objective',
      'Save Objective',
      this._editObjective,
      <ObjectiveChangeModal
        onChange={this._handleObjectiveChange}
        defaultName={this.state.objective.name}
        defaultEndsAt={this.state.objective.endsAt}
      />
    )
  ))

  _showSetOwnerModal = () =>
    this.props.dispatch(this._showModal(
      'This Objective need an Owner!',
      'Claim Ownership',
      this._claimOwnership,
      <SetOwnerModal />
  ))
}

const ADD_COLLABORATOR = gql`
  mutation addCollaborator($objective: String!, $user: String!) {
    addCollaborator(objective: $objective, user: $user) {
      user {
        id
        firstName
        lastName
        img
      }
    }
  }
`

const EDIT_OBJECTIVE = gql`
  mutation editObjective($id: String!, $name: String) {
    editObjective(id: $id, name: $name) {
      id
      name
      status
      endsAt
      isPrivate
      owner {
        id
        img
        firstName
        lastName
      }
    }
  }
`

const NEW_OBJECTIVE = gql`
  mutation createObjective($name: String!) {
    createObjective(name: $name) {
      id
      name
      status
    }
  }
`

const SEARCH_USERS = gql`
  query searchUsers($q: String!) {
    viewer {
      users(q: $q) {
        id, firstName, lastName
      }
    }
  }
`

const withEditMutation = graphql(EDIT_OBJECTIVE, {
  props: ({ mutate }) => ({
    editObjective: ({ objective: { id, name, endsAt, owner, isPrivate }}) => mutate ({
      variables: { id, name, endsAt, owner, isPrivate },
      optimisticResponse: {
        __typename: 'Mutation',
        editObjective: {
          __typename: 'Objective',
          id,
          name,
          endsAt,
          status: 'draft',
          isPrivate,
          owner: owner.id
        }
      },

      updateQueries: {
        ObjectiveList: (prev, { mutationResult }) => {
          const { editObjective } = mutationResult.data
          const idx = prev.viewer.objectives.findIndex(o => o.id === editObjective.id)

          const objectives = update(prev.viewer.objectives, {
            $splice: [[idx, 1, editObjective]]
          })

          return update(prev, {
            viewer: {
              objectives: { $set: objectives },
              objective: { $merge: editObjective }
            }
          })
        }
      }
    })
  })
})

const withCreateMutation = graphql(NEW_OBJECTIVE, {
  props: ({ mutate }) => ({
    createObjective: ({ objective: { name, endsAt }}) => mutate ({
      variables: { name, endsAt },
      optimisticResponse: {
        __typename: 'Mutation',
        createObjective: {
          __typename: 'Objective',
          id: Math.random().toString(16).slice(2),
          endsAt,
          name,
          isPrivate: false,
          status: 'draft'
        }
      },

      updateQueries: {
        ObjectiveList: (prev, { mutationResult }) => {
          const { createObjective } = mutationResult.data
          const objectives = update(prev.viewer.objectives, {
            $unshift: [createObjective]
          })

          return update(prev, {
            viewer: {
              objectives: { $set: objectives },
            }
          })
        }
      }
    })
  })
})

const withAddCollaboratorMutation = graphql(ADD_COLLABORATOR, {
  props: ({mutate}) => ({
    addCollaborator: (objectiveId, userId) => mutate ({
      variables: {
        objective: objectiveId,
        user: userId
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addCollaborator: {
          __typename: 'Collaborator',
          id: Math.random().toString(16).slice(2),
          user: {},
          objective: {}
        }
      },
      updateQueries: {
        ObjectiveList: (prev, { mutationResult }) => {
          return ({
            ...prev,
            viewer: {
              ...prev.viewer,
              objective: {
                ...prev.viewer.objective,
                collaborators: [
                  ...prev.viewer.objective.collaborators,
                  mutationResult.data.addCollaborator
                ]
              }
            }
          })
        }
      }
    })
  })
})

const GET_OBJECTIVELIST_QUERY = gql`
  query ObjectiveList($id: String) {
    viewer {
      id
      company {
        id
        name
        users {
          id
          firstName
          lastName
          email
          img
        }
      }
      objectives {
        id
        name
        status
        isPrivate
      }
      objective(id: $id) {
        id
        ...ObjectiveHeaderFragment
        ...ObjectiveFeedFragment
      }
    }
  }
  ${ObjectiveHeader.fragments.objective}
  ${ObjectiveFeed.fragments.feed}
`

const withData = graphql(GET_OBJECTIVELIST_QUERY, {
  options: ownProps => ({
    variables: {
      id: null
    },
    forceFetch: true
  })
})

export default compose(
  withEditMutation,
  withCreateMutation,
  withAddCollaboratorMutation,
  withData,
  connect(state => state.global)
)(Objectives)
