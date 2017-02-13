import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'

import Button, { StyledButton } from '../Button'
import TaskListItem from './TaskListItem'
import AddView from './AddView'

const TaskList = styled(({
  tasks,
  saveTask,
  editTask,
  className,
  isCollaborator
}) => {
  const handleCompleteTask = (task) => v => (isCollaborator ? editTask({...task, isComplete: v}) : null)
  const handleEditTask = (task) => v => (isCollaborator ? editTask({...task, title: v}) : null)

  const taskListBody = tasks && tasks.length
    ? tasks.map(t => <TaskListItem task={t} key={t.id} completeTask={handleCompleteTask(t)} editTask={handleEditTask(t)} className='task' />)
    : <div>No tasks :( Add some!</div>

  return (
    <div className={className}>
      <h3>Task List:</h3>
      <div className="list">
        { taskListBody }

        {  isCollaborator && <AddTaskListItem saveTask={saveTask} className='task' /> }
      </div>
    </div>
  )
})`
  .task {
    padding: 10px 0;
  }
`

class AddTaskListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAdding: false
    }
  }

  render() {
    return <AddTask
      isAdding={this.state.isAdding}
      onClick={this._toggleView}
      onSave={this._handleSave}
    />
  }

  _toggleView = e => this.setState(prev => ({ isAdding: !prev.isAdding }))

  _handleSave = (task) => {
    this._toggleView()
    this.props.saveTask(task)
  }
}

const AddTask = styled(({ isAdding, className, onClick, onSave }) => {
  if (!isAdding) return <div className={className} onClick={onClick}>+ Add Task</div>

  return <AddView saveTask={onSave} onCancel={onClick} className={className} />
})`
  cursor: pointer;
  font-size: 0.85rem;
  color: #777;
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
