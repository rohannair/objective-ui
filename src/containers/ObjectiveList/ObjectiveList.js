import React, { Component, PropTypes } from 'react'
import styles from './ObjectiveList.css'

import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'

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

class ObjectiveList extends Component {
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
    objective: this.defaultObjectiveState
  }

  _getObjective = (id) => {
    this.props.data.refetch({ id })
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

  _createNewObjective = () => {
    this._handleObjectiveToggle('addingNewObjective')

    const { objective } = this.state
    this.props.createObjective({ objective })

    this.setState({
      objective: this.defaultObjectiveState
    })
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

  _editObjective = () => {
    this._handleObjectiveToggle('editingObjective')

    const { objective } = this.state
    this.props.editObjective({ objective })

    this.setState({
      objective: this.defaultObjectiveState
    })
  }

  render() {
    const { data: { viewer, loading } } = this.props

    if (loading && !viewer) {
      return <LoadingBar />
    }

    const objectiveFeed = viewer.objective
    ? <ObjectiveFeed {...viewer.objective} />
    : <div>Select an Objective</div>

    return (
      <div className={styles.mainContainer}>
        <ObjectiveListSidebar>
          <h3>{viewer.company.name}</h3>
          {
            viewer.objectives.map(o => (
              <div
                key={o.id}
                className="item"
                onClick={() => this._getObjective(o.id) }
              >
                { o.name }
              </div>
            ))
          }

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
              { label: 'Edit', onClick: this._editObjective }
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
            menuLeft
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
}

// TODO: EDIT_OBJECTIVE mutation

const EDIT_OBJECTIVE = gql`
  mutation editObjective($id: String!, $name: String) {
    editObjective(id: $id, name: $name) {
      id
      name
      status
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
    editObjective: ({ objective: { id, name, endsAt }}) => mutate ({
      variables: { id, name, endsAt },
      optimisticResponse: {
        __typename: 'Mutation',
        editObjective: {
          __typename: 'Objective',
          id,
          name,
          endsAt: endsAt,
          status: 'draft'
        }
      },

      updateQueries: {
        ObjectiveList: (prev, { mutationResult }) => {
          const { editObjective } = mutationResult.data
          const idx = prev.viewer.objectives.findIndex(o => o.id === editObjective.id)

          return ({
            ...prev,
            viewer: {
              ...prev.viewer,
              objectives: [
                ...prev.viewer.objectives.slice(0, idx),
                editObjective,
                ...prev.viewer.objectives.slice(idx + 1)
              ]
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
          return ({
            ...prev,
            viewer: {
              ...prev.viewer,
              objectives: [
                mutationResult.data.createObjective,
                ...prev.viewer.objectives
              ]
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
  ${ObjectiveFeed.fragments.feed}
  ${ObjectiveHeader.fragments.objective}
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
)(ObjectiveList)

