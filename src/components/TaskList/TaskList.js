import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'

import Button, { StyledButton } from '../Button'
import TaskListItem from './TaskListItem'
import AddView from './AddView'

const TaskList = styled(({
  tasks,
  saveTask,
  completeTask,
  className,
  isCollaborator
}) => {
  const handleCompleteTask = (task) => v => (isCollaborator ? completeTask({...task, isComplete: v}) : null)

  const taskListBody = tasks && tasks.length
    ? tasks.map(t => <TaskListItem task={t} key={t.id} completeTask={handleCompleteTask(t)} />)
    : <div>No tasks :( Add some!</div>

  return (
    <div className={className}>
      <h3>Task List:</h3>

      <div className={'list'}>
        { taskListBody }

        { isCollaborator ? <AddViewToggle saveTask={saveTask} /> : null }
      </div>
    </div>
  )
})`
  .list {
    margin: 20px 0;
  }
`

class AddViewToggle extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAdding: false
    }
  }

  render() {
    return !this.state.isAdding
      ? <Button inline onClick={this._toggleView}>+ Add Task</Button>
      : <AddView saveTask={this._handleSave} onCancel={this._toggleView} />
  }

  _toggleView = () => {
    this.setState(prev => ({
      isAdding: !prev.isAdding
    }))
  }

  _handleSave = (task) => {
    this._toggleView()
    this.props.saveTask(task)
  }
}

const CREATE_TASK = gql`
  mutation createTask($title: String!, $isComplete: Boolean!, $objective: String!) {
    createTask(title: $title, isComplete: $isComplete, objective: $objective) {
      id
      title
      isComplete
    }
  }
`

const EDIT_TASK = gql`
  mutation editTask($id: String!) {
    editTask(id: $id) {
      id
      title
      isComplete
    }
  }
`

TaskList.mutations = {
  CREATE_TASK,
  EDIT_TASK
}

export default TaskList
