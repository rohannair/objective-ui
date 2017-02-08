import React, { Component } from 'react'
import styled from 'styled-components'
import classNames from 'classnames'

import Checkbox from '../Forms/Checkbox'
import { StyledButton as Button } from '../Button'
import AddView from './AddView'

class TaskListItem extends Component {
  constructor(props) {
    super(props)

    this.defaultState = {
      isEditing: false
    }

    this.state = this.defaultState
  }

  render() {
    const { task, completeTask } = this.props

    if (this.state.isEditing) return <AddView task={task} saveTask={this._handleEdit} onCancel={this._toggleEditing} />

    const checkboxStyle = classNames({
      completed: task.isComplete,
      checkbox: true
    })

    return (
      <div className={this.props.className}>
        <Checkbox
          isChecked={task.isComplete}
          label={task.title}
          onChange={completeTask}
          className={checkboxStyle}
        />
        <Button className={'edit'} icon onClick={this._toggleEditing}><i className="zmdi zmdi-edit" /></Button>
      </div>
    )
  }

  _handleEdit = (task) => {
    this.props.editTask(task.title)
    this._toggleEditing()
  }

  _toggleEditing = () => {
    this.setState(prev => ({
      isEditing: !prev.isEditing
    }))
  }
}

const StyledTaskListItem = styled(TaskListItem)`
  display: flex;
  margin: 2px 0;

  .checkbox {
    flex: 1 0 auto;

    &.completed span {
      color: #666;
      text-decoration: line-through;
    }
  }

  .edit {
    flex: 0 0 auto;
    visibility: hidden;
  }

  &:hover .edit {
    visibility: visible;
  }
`

export default StyledTaskListItem
