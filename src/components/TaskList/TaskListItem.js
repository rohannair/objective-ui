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

    const checkboxStyle = classNames({
      completed: task.isComplete,
      chk: true
    })

    const body = this.state.isEditing
    ? <AddView task={task} saveTask={this._handleEdit} onCancel={this._toggleEditing} />
    : <div className='container'>
        <Checkbox key='checkbox'
          isChecked={task.isComplete}
          label={task.title}
          onChange={completeTask}
          className={checkboxStyle} />
        <Button key='edit' className={'edit'} icon onClick={this._toggleEditing}><i className="zmdi zmdi-edit" /></Button>
      </div>

    return (
      <div className={this.props.className}>
        { body }
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
  .container {
    display: flex;
    align-items: baseline;
    align-content: center;
  }

  .chk {
    flex: 1 0 auto;
    margin: 0;

    &.completed span {
      color: #666;
      text-decoration: line-through;
    }

    & span {
      font-size: 1rem;
    }
  }

  .edit {
    flex: 0 0 auto;
    visibility: hidden;
  }

  &:hover {
    background-color: #ccc;

      .edit {
      visibility: visible;
    }
  }
`

export default StyledTaskListItem
