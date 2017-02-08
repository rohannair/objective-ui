import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'

import Checkbox from '../Forms/Checkbox'
import TextInput from '../Forms/TextInput'
import { StyledButton as Button } from '../Button'

class AddView extends Component {
  constructor(props) {
    super(props)

    this.defaultTaskState = {
      id: 0,
      title: '',
      isComplete: false
    }

    this.state = props.task
    ? props.task
    : this.defaultTaskState
  }

  render() {
    const task = this.state

    const input = <TextInput
      defaultValue={task.title}
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
          <Button primary small onClick={this._handleSave}>+</Button>
          <Button cancel link small onClick={this.props.onCancel}>&times;</Button>
        </div>
      </div>
    )
  }

  _handleSave = () => {
    const task = this.state
    if (task.title === '') return

    this.setState(this.defaultTaskState)
    this.props.saveTask(task)
  }

  _updateTask = (name) => val => {
    this.setState(prev => ({
      ...prev,
      [name]: val
    }))
  }
}

AddView.propTypes = {
  onCancel: PropTypes.func,
  saveTask: PropTypes.func.isRequired
}

AddView.defaultProps = {
  onCancel: () => {}
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

export default StyledAddView
