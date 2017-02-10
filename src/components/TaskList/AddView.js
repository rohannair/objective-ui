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
    const { title, isComplete} = this.state

    return (
      <div className={this.props.className}>
        <Checkbox
          isChecked={isComplete}
          onChange={this._updateTask('isComplete')}
          className="checkbox"
        />

        <TextInput
          defaultValue={title}
          type="text"
          onChange={this._updateTask('title')}
          className="title"
        />

        <div className={'actions'}>
          <Button link icon onClick={this._handleSave}>
            <i className="zmdi zmdi-save" />
          </Button>

          <Button cancel link icon onClick={this.props.onCancel}>
            &times;
          </Button>
        </div>
      </div>
    )
  }

  _handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this._handleSave()
    }
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
  width: 100%;

  .checkbox {
    flex: 0 0 auto;
    margin: 0;
  }

  .title {
    flex: 1 0 auto;
    padding: 0 0 0 0.625rem;

    & input {
      padding: 0;
    }
  }

  .actions {
    display: flex;

  }

`

export default StyledAddView
