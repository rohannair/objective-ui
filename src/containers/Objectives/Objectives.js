import React, { Component, PropTypes } from 'react'
import styles from './Objectives.css'

import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import update from 'immutability-helper'

import LoadingBar from '../../components/LoadingBar'
import ObjectiveFeed from '../../components/ObjectiveFeed'
import ObjectiveHeader from '../../components/ObjectiveHeader'
import ObjectivesSidebar from '../../components/ObjectivesSidebar'
import DatePicker from '../../components/Datepicker'

import Button from '../../components/Button'
import Modal from '../../components/Modal'

import Dialog from 'react-toolbox/lib/dialog'
import TextInput from '../../components/Forms/TextInput'
import { StyledButton } from '../../components/Button/Button'

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
      endsAt: Date.now()
    }

    this.state = {
      objective: this.defaultObjectiveState
    }

    this.modalAction = {
      type: 'SHOW_MODAL',
    }
  }

  render() {
    const { dispatch, data: { viewer, loading } } = this.props

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
        <ObjectivesSidebar>
          <h3>{viewer.company.name}</h3>
          { objective }
          <div className={styles.buttonContainer}>
            <StyledButton
              secondary
              squared
              onClick={() => dispatch(this._showNewObjectiveModal())}
            >+</StyledButton>
          </div>
        </ObjectivesSidebar>

        <div className={styles.objectivelist}>
          <ObjectiveHeader
            objective={viewer.objective}
            setOwner={() => dispatch(this._showSetOwnerModal())}
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
                this._showEditObjectiveModal(viewer.objective)
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

  _handleObjectiveChange = (name) => val => {
    this.setState(prev => ({
      objective: {
        ...prev.objective,
        [name]: val
      }
    }))
  }

  _setOwner = () => {
    this.setState(prev => ({
      settingOwner: !prev.settingOwner
    }))
  }


  _showNewObjectiveModal = () => ({
    ...this.modalAction,
    title: 'Create New Objective',
    action: {
      label: 'Create Objective',
      event: this._createNewObjective
    },
    modalComponent: (<div>
      <TextInput
        label="Objective name"
        onChange={this._handleObjectiveChange('name')}
        defaultValue={this.state.objective.name}
      />
      <DatePicker
        label='End date'
        onChange={this._handleObjectiveChange('endsAt')}
        defaultValue={this.state.objective.endsAt}
      />
    </div>)
  })

  _showEditObjectiveModal = ({id, name, endsAt}) => this.setState({
    objective: { id, name, endsAt }
  }, () => this.props.dispatch(this._showNewObjectiveModal()))

  _showSetOwnerModal = () => ({
    ...this.modalAction,
    title: 'This Objective need an Owner!',
    action: {
      label: 'Claim Ownership',
      event: this._claimOwnership
    },
    modalComponent: (<p>It seems like this Objective was created without an owner. Would you like to set yourself as the owner?</p>)
  })
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
  withData,
  connect(state => state.global)
)((Objectives))

