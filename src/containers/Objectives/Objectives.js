import React, { Component, PropTypes } from 'react'
import styles from './Objectives.css'

import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import update from 'immutability-helper'

import LoadingBar from '../../components/LoadingBar'
import ObjectiveFeed from '../../components/ObjectiveFeed'
import ObjectiveHeader from '../../components/ObjectiveHeader'
import ObjectiveListSidebar from '../../components/ObjectiveListSidebar'

import DatePicker from 'react-toolbox/lib/date_picker'
import Dialog from 'react-toolbox/lib/dialog'
import TextInput from '../../components/Forms/TextInput'
import { StyledButton } from '../../components/Button/Button'

const datetime = new Date(2015, 10, 16)
const min_datetime = new Date(new Date(datetime).setDate(8))

class Objectives extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      viewer: PropTypes.object,
    }).isRequired,
    createObjective: PropTypes.func.isRequired,
    editObjective: PropTypes.func.isRequired
  };

  defaultObjectiveState = {
    id: '',
    name: '',
    endsAt: ''
  }

  state = {
    addingNewObjective: false,
    editingObjective: false,
    settingOwner: false,
    addingCollaborators: false,
    objective: this.defaultObjectiveState
  }

  render() {
    const { data: { viewer, loading } } = this.props

    if (loading && !viewer) {
      return <LoadingBar />
    }

    const objectiveFeed = viewer.objective
    ? <ObjectiveFeed {...viewer.objective} viewer={viewer} />
    : <div>Select an Objective</div>

    const objective = viewer.objectives.map(o => (
      <div
        key={o.id}
        className="item"
        onClick={() => this._getObjective(o.id) }
      >
        { o.name }
      </div>
    ))

    return (
      <div className={styles.mainContainer}>
        <ObjectiveListSidebar>
          <h3>{viewer.company.name}</h3>
          { objective }

          {
            /**
             *  Creating Modal here
             */
          }

          <Dialog
            active={this.state.addingNewObjective}
            onEscKeyDown={this._handleObjectiveToggle.bind(this, 'addingNewObjective')}
            onOverlayClick={this._handleObjectiveToggle.bind(this, 'addingNewObjective')}
            title='Create New Objective'
            actions={[
              { label: 'Cancel', onClick: this._handleObjectiveToggle.bind(this, 'addingNewObjective') },
              { label: 'Create', onClick: this._createNewObjective }
            ]}
          >
            <TextInput
              type="text"
              label="Objective name"
              onChange={this._handleObjectiveChange.bind(this, 'name')}
              value={this.state.objective.name}
            />
            <DatePicker
              label='End date'
              minDate={min_datetime}
              onChange={this._handleObjectiveChange.bind(this, 'endsAt')}
              value={this.state.objective.endsAt}
            />
          </Dialog>

          {
            /**
             *  Editing Modal here
             */
          }
          <Dialog
            active={this.state.editingObjective}
            onEscKeyDown={this._handleObjectiveToggle.bind(this, 'editingObjective')}
            onOverlayClick={this._handleObjectiveToggle.bind(this, 'editingObjective')}
            title='Edit Objective'
            actions={[
              { label: 'Cancel', onClick: this._handleObjectiveToggle.bind(this, 'editingObjective') },
              { label: 'Save', onClick: this._editObjective }
            ]}
          >
            <TextInput
              type="text"
              label="Objective name"
              onChange={this._handleObjectiveChange.bind(this, 'name')}
              value={this.state.objective.name}
            />
            <DatePicker
              label='End date'
              minDate={min_datetime}
              onChange={this._handleObjectiveChange.bind(this, 'endsAt')}
              value={this.state.objective.endsAt}
            />
          </Dialog>

          {
            /**
             *  SetOwner Modal here
             */
          }
          <Dialog
            active={this.state.settingOwner}
            onEscKeyDown={this._handleObjectiveToggle.bind(this, 'settingOwner')}
            onOverlayClick={this._handleObjectiveToggle.bind(this, 'settingOwner')}
            title='This Objective needs an Owner!'
            actions={[
              { label: 'Cancel', onClick: this._setOwner },
              { label: 'Claim Ownership', onClick: this._claimOwnership }
            ]}
          >
            <p>It seems like this Objective was created without an owner. Would you like to set yourself as the owner?</p>
          </Dialog>

          <div className={styles.buttonContainer}>
            <StyledButton
              secondary
              squared
              onClick={this._handleObjectiveToggle.bind(this, 'addingNewObjective')}
            >+</StyledButton>
          </div>
        </ObjectiveListSidebar>

        <div className={styles.objectivelist}>
          <ObjectiveHeader
            objective={viewer.objective}
            edit={this._handleObjectiveToggle.bind(this, '')}
            setOwner={this._setOwner}
            addingCollaborators={this._toggleCollaboratorsModal}
            menuLeft
            isOwner={
              viewer.objective
                && viewer.objective.owner
                && viewer.objective.owner.id === viewer.id
            }
            dropdownOptions={[
              { name: 'Edit', onClick: e => {
                e.preventDefault()
                this._handleEditObjective(viewer.objective)
              }, icon: 'edit' }
            ]}
          />

          <div className={styles.body}>
            <div className={styles.mainWindow}>
              { objectiveFeed }
            </div>
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

    this.setState(prevState => ({
      settingOwner: !prevState.settingOwner
    }))
  }

  _createNewObjective = () => {
    this._handleObjectiveToggle('addingNewObjective')

    const { objective } = this.state
    this.props.createObjective({ objective })

    this.setState({
      objective: this.defaultObjectiveState
    })
  }

  _editObjective = () => {
    this._handleObjectiveToggle('editingObjective')

    const { objective } = this.state
    this.props.editObjective({ objective })

    this.setState({
      objective: this.defaultObjectiveState
    })
  }

  _getObjective = (id) => {
    this.props.data.refetch({ id })
  }

  _handleEditObjective = ({id, name, endsAt}) => {
    this.setState({
      editingObjective: true,
      objective: {
        id,
        name,
        endsAt
      }
    })
  }

  _handleObjectiveToggle = (name, e) => {
    e && e.preventDefault()
    this.setState({
      [name]: !this.state[name]
    })
  }

  _handleObjectiveChange = (name, val) => {
    this.setState({
      objective: {
        ...this.state.objective,
        [name]: val
      }
    })
  }

  _setOwner = () => {
    this.setState(prev => ({
      settingOwner: !prev.settingOwner
    }))
  }

  _toggleCollaboratorsModal = () => {
    this.setState(prev => ({
      addingCollaborators: !prev.addingCollaborators
    }))
  }
}

const ADD_COLLABORATOR = gql`
  mutation addCollaborator($id: String!, $user: String!) {
    addCollaborator(id: $id, user: $user) {
      id
      img
      firstName
      lastName
    }
  }
`

const EDIT_OBJECTIVE = gql`
  mutation editObjective($id: String!, $name: String) {
    editObjective(id: $id, name: $name) {
      id
      name
      status
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

const withEditMutation = graphql(EDIT_OBJECTIVE, {
  props: ({ mutate }) => ({
    editObjective: ({ objective: { id, name, endsAt, owner }}) => mutate ({
      variables: { id, name, endsAt, owner },
      optimisticResponse: {
        __typename: 'Mutation',
        editObjective: {
          __typename: 'Objective',
          id,
          name,
          endsAt: endsAt,
          status: 'draft',
          owner: {
            id: owner
          }
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
          endsAt: endsAt,
          name,
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

const GET_OBJECTIVELIST_QUERY = gql`
  query ObjectiveList($id: String) {
    viewer {
      id
      company {
        id
        name
      }
      objectives {
        id
        name
        status
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
  withData
)(Objectives)

