import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'

import Checkbox from '../Forms/Checkbox'
import TextInput from '../Forms/TextInput'
import Button, { StyledButton } from '../Button'
import TaskListItem from './TaskListItem'

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

        { isCollaborator ? <StyledAddView saveTask={saveTask} /> : null }
      </div>
    </div>
  )
})`
  .list {
    margin: 20px 0;
  }
`


  }

class AddView extends Component {
  constructor(props) {
    super(props)

    this.defaultTaskState = {
      id: 0,
      title: '',
      isComplete: false
    }

    this.defaultState = {
      isAdding: false,
      task: this.defaultTaskState
    }

    this.state = this.defaultState
  }

  render() {
    if (!this.state.isAdding) return <Button inline onClick={this._toggleView}>+ Add Task</Button>

    const { task } = this.state

    const input = <TextInput
      value={task.title}
      type='text'
      onChange={this._updateTask('title')}
      className={'title'} />

    const checkbox = <Checkbox
      isChecked={task.isComplete}
      onChange={this._updateTask('isComplete')}
      className={'checkbox'} />

    return (
      <div className={this.props.className}>
        { checkbox }
        { input }
        <div className={'actions'}>
          <StyledButton primary small onClick={this._handleSave}>+</StyledButton>
          <StyledButton cancel link small onClick={this._toggleView}>&times;</StyledButton>
        </div>
      </div>
    )
  }

  _toggleView = () => {
    this.setState(prev => ({
      isAdding: !prev.isAdding
    }))
  }

  _handleSave = () => {
    const { task } = this.state
    if (task.title === '') return

    this.setState(this.defaultState)
    this.props.saveTask(task)
  }

  _updateTask = (name) => val => {
    this.setState(prev => ({
      task: {
        ...prev.task,
        [name]: val
      }
    }))
  }
}

const StyledAddView = styled(AddView)`
  display: flex;
  flex: nowrap;
  justify-content: space-around;
  align-items: baseline;
  align-content: center;

  .checkbox {
    flex: 0 0 auto;
  }

  .title {
    flex: 1 0 auto;
    margin: 0 5px;
    padding: 0;
  }

  .actions {
    display: flex;
    flex: 0 0 auto;

    & > * {
      flex: 0 0 auto;
      margin: 0 2px;
    }
  }

`

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
