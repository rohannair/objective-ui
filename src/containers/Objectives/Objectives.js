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
import ObjectiveStatistics from '../../components/ObjectiveStatistics'
import ObjectiveFeedSidebar from '../../components/ObjectiveFeedSidebar'
import TaskList from '../../components/TaskList'
import SnapshotHeader from '../../components/SnapshotHeader'

import Button from '../../components/Button'
import Alert from '../../components/Alert'

import { StyledButton } from '../../components/Button/Button'

import { ObjectiveChangeModal, SetOwnerModal, ConfirmTaskDeleteModal } from './Modals'
import EditSnapshotObjectiveModal from '../../modals/EditSnapshotObjectiveModal'

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

    this.defaultEditSnapshotObjectiveState = {
      objectiveId: '',
      query: ''
    }

    this.defaultSnapshotState = {
      id: '',
      name: '',
    }

    this.state = {
      objective: this.defaultObjectiveState,
      addCollaborator: this.defaultAddCollaboratorState,
      snapshot: this.defaultSnapshotState,
      editSnapshotObjective: this.defaultEditSnapshotObjectiveState
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
            onPrivateChange={this._handleObjectivePrivacyChange}
            objective={viewer.objective}/>

          { this._objectiveBody(viewer, viewer.objective) }
        </div>
      </div>
    )
  }

  _objectiveBody = (viewer, objective) => {
    if (!objective) return null

    const isCollaborator = (objective.owner && viewer.id === objective.owner.id) || (objective.collaborators.reduce((acc, c) => c.user.id === viewer.id, false))

    return (
      <div>
        {
          !viewer.objective.owner && (
            <Alert type="warn">This objective has no owner. To claim it as your own, click the <strong>?</strong> above</Alert>
          )
        }
        <div className={styles.body}>

          <ObjectiveFeed {...viewer.objective}
            objective={viewer.objective}
            viewer={viewer}
            editSnapshotObjective={this._showEditSnapshotObjectiveModal}
            submit={this._submit} />
          <ObjectiveFeedSidebar>
            <ObjectiveStatistics>
              <TaskList
                tasks={viewer.objective.tasks}
                saveTask={this._saveTask(objective.id)}
                editTask={this._editTask(objective.id)}
                deleteTask={this._confirmDeleteTask(objective.id)}
                isCollaborator={isCollaborator} />
            </ObjectiveStatistics>
          </ObjectiveFeedSidebar>
        </div>
      </div>
    )
  }

  _submit = (cb, vals) => {
    const { submit } = this.props
    const { body, blocker, objective, img } = vals
    submit(body, blocker, objective, img)

    cb()
  };

  _editTask = (objectiveId) => task => (this.props.editTask(task, objectiveId))
  _saveTask = (objectiveId) => task => (this.props.createTask(task, objectiveId))
  _confirmDeleteTask = (objectiveId) => task => {
    this.props.dispatch(
      this._showModal(
        'Delete Task',
        'Delete Task',
        this._deleteTask(task),
        <ConfirmTaskDeleteModal task={task} />
      )
    )
  }

  _deleteTask = (task) => () => {
    this.props.deleteTask(task)
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

  _handleEditSnapshotObjectiveChange = name => val => {
    this.setState(prev => ({
      editSnapshotObjective: {
        ...prev.editSnapshotObjective,
        [name]: val
      }
    }))
  }

  _editSnapshotObjective = () => {
    const { objectiveId } = this.state.editSnapshotObjective
    const { id } = this.state.snapshot
    this.props.editSnapshotObjective(objectiveId, id)
    this.setState({
      editSnapshotObjective: this.defaultEditSnapshotObjectiveState,
      snapshot: this.defaultSnapshotState
    })
  }

  _showEditSnapshotObjectiveModal = ({ name, id }) => this.setState({
    snapshot: { name, id }
  }, () => this.props.dispatch(
        this._showModal(
          'Edit Objective',
          'Edit Objective',
          this._editSnapshotObjective,
          <EditSnapshotObjectiveModal
            onChange={this._handleEditSnapshotObjectiveChange('objectiveId')}
            source={this.props.data.viewer.objectives}
            query={this.state.editSnapshotObjective.query}
            onQueryChange={this._handleEditSnapshotObjectiveChange('query')}
          />
        )
      )
    )

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
          owner: owner && owner.id
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

const withCreateSnapshotMutation = graphql(ObjectiveFeed.mutations.NEW_SNAPSHOT, {
  props: ({ mutate }) => ({
    submit: (body, blocker, objective, img) => mutate({
      variables: { body, blocker, objective, img },
      updateQueries: {
        ObjectiveList: (prev, { mutationResult}) => {
          const { addSnapshot } = mutationResult.data
          const snapshots = update(prev.viewer.objective.snapshots, {
            $splice: [[0, 0, addSnapshot]]
          })

          return update(prev, {
            viewer: {
              objective: {
                snapshots : { $set: snapshots }
              }
            }
          })
        }
      }
    })
  })
})

const withCreateTaskMutation = graphql(TaskList.mutations.CREATE_TASK, {
  props: ({mutate}) => ({
    createTask: ({title, isComplete}, objectiveId) => mutate({
      variables: {
        title,
        isComplete,
        objective: objectiveId
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createTask: {
          __typename: 'Task',
          id: Math.random().toString(16).slice(2),
          title,
          isComplete
        }
      },
      updateQueries: {
        ObjectiveList: (prev, { mutationResult }) => {
          if (!prev.viewer.objective) return prev
          const { createTask } = mutationResult.data
          const tasks = update(prev.viewer.objective.tasks, {
            $push: [createTask]
          })

          return update(prev, {
            viewer: {
              objective: {
                tasks: { $set: tasks }
              }
            }
          })
        }
      }
    })
  })
})

const withEditTaskMutation = graphql(TaskList.mutations.EDIT_TASK, {
  props: ({mutate}) => ({
    editTask: (task) => mutate({
      variables: task,
      optimisticResponse: {
        __typename: 'Mutation',
        editTask: {
          __typename: 'Task',
          ...task
        }
      },
      updateQueries: {
        ObjectiveList: (prev, { mutationResult }) => {
          if (!prev.viewer.objective) return prev
          const { editTask } = mutationResult.data
          const idx = prev.viewer.objective.tasks.findIndex(o => o.id === editTask.id)

          const tasks = update(prev.viewer.objective.tasks, {
            $splice: [[idx, 1, editTask]]
          })

          return update(prev, {
            viewer: {
              objective: {
                tasks : { $set: tasks }
              }
            }
          })
        }
      }
    })
  })
})

const withDeleteTaskMutation = graphql(TaskList.mutations.DELETE_TASK, {
  props: ({mutate}) => ({
    deleteTask: ({ id }) => mutate({
      variables: {id},
      optimisticResponse: {
        __typename: 'Mutation',
        deleteTask: id
      },
      updateQueries: {
        ObjectiveList: (prev, { mutationResult }) => {
          if (!prev.viewer.objective) return prev

          const { deleteTask } = mutationResult.data
          const idx = prev.viewer.objective.tasks.findIndex(o => o.id === deleteTask)

          const tasks = update(prev.viewer.objective.tasks, {
            $splice: [[idx, 1]]
          })

          return update(prev, {
            viewer: {
              objective: {
                tasks: { $set: tasks }
              }
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

const withEditSnapshotObjectiveMutation = graphql(SnapshotHeader.mutations.editSnapshotObjective, {
  props: ({mutate}) => ({
    editSnapshotObjective: (objectiveId, id) => mutate({
      variables: {
        objectiveId,
        id
      },
      updateQueries: {
        ObjectiveList: (prev, { mutationResult }) => {
          if (!prev.viewer.objective) return prev
          const { editSnapshotObjective } = mutationResult.data
          const snapshotIdx = prev.viewer.objective.snapshots.findIndex(s => s.id === editSnapshotObjective.id)
          const prevSnapshot = prev.viewer.objective.snapshots[snapshotIdx]
          const editedSnapshot = update(prevSnapshot, { $merge: { objective: editSnapshotObjective.objective }})
          const snapshots = update(prev.viewer.objective.snapshots, {
            $splice: [[snapshotIdx, 1, editedSnapshot]]
          })

          return update(prev, {
            viewer: {
              objective: {
                snapshots: { $set: snapshots }
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
        tasks {
          id
          title
          isComplete
        }
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
  withCreateTaskMutation,
  withEditTaskMutation,
  withDeleteTaskMutation,
  withAddCollaboratorMutation,
  withEditSnapshotObjectiveMutation,
  withCreateSnapshotMutation,
  withData,
  connect(state => state.global)
)(Objectives)
