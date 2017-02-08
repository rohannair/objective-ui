import React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'

import Checkbox from '../Forms/Checkbox'
import { StyledButton as Button } from '../Button'

const TaskListItem = styled(({
  task,
  completeTask,
  className
}) => {
  const checkboxStyle = classNames({
    completed: task.isComplete,
    checkbox: true
  })

  return (
    <div className={className}>
      <Checkbox
        isChecked={task.isComplete}
        label={task.title}
        onChange={completeTask}
        className={checkboxStyle}
      />
      <Button className={'edit'} icon><i className="zmdi zmdi-edit" /></Button>
    </div>
  )
})`
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
export default TaskListItem
