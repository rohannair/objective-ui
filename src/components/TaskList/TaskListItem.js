import React, { Component } from 'react'
import styled from 'styled-components'
import classNames from 'classnames'

import Checkbox from '../Forms/Checkbox'
import { StyledButton as Button } from '../Button'
import AddView from './AddView'

class TaskListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false
    }
  }

  render() {
    const { task, completeTask } = this.props

    const checkboxStyle = classNames({
      completed: task.isComplete,
      chk: true
    })

    if (this.state.isEditing) return <AddView task={task} saveTask={this._handleEdit} onCancel={this._toggleEditing} />

    return (
      <div className={this.props.className}>
        <Checkbox
          key="checkbox"
          isChecked={task.isComplete}
          label={task.title}
          onChange={completeTask}
          className={checkboxStyle}
        />

        <Button
          key="edit"
          className="edit"
          icon
          onClick={this._toggleEditing}
        >
          <i className="zmdi zmdi-edit" />
        </Button>
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

export default styled(TaskListItem)`
  display: flex;
  align-items: baseline;
  align-content: center;

  .chk {
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    margin: 0;

    &.completed span {
      color: #009ED9;
      opacity: 0.7;
    }

    span {
      font-size: 1rem;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .edit {
    margin-left: auto;
    visibility: hidden;

    &:hover {
      color: #009ED9;
    }
  }

  &:hover {
    cursor: pointer;

    .edit {
      visibility: visible;
    }

  }
`
