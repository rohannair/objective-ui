import React, { Component, PropTypes } from 'react'

import TextInput from '../../../../components/Forms/TextInput'
import DatePicker from '../../../../components/Datepicker'
import { newDate, timestamp } from '../../../../utils/dates'
import ToggleSwitch from '../../../../components/Forms/ToggleSwitch'
import Dialog from 'react-toolbox/lib/dialog'

export class ObjectiveChangeModal extends Component {

  constructor(props) {
    super(props)

    this.defaultObjectiveState = {
      ...this.props.defaultValues
    }

    this.state = {
      objective: this.defaultObjectiveState
    }
  }

  _handleChange = (name) => (val) => {
    this.setState(prev => ({
      objective: {
        ...prev.objective,
        [name]: name === 'endsAt' ? timestamp(val) : val
      }
    }))
  }

  _onSubmit = () => {
    this.props.submit(this.state.objective)
  }

  render() {

    const { active, close, title, label } = this.props

    return (
     <Dialog
      active={active}
      onEscKeyDown={close}
      onOverlayClick={close}
      title={title}
      actions={[
        { label: 'Cancel', onClick: close},
        { label: label, onClick: this._onSubmit }
      ]}>
        <TextInput
          label={'Objective Name'}
          onChange={this._handleChange('name')}
          value={this.state.objective.name}
        />
        <DatePicker
          label={'End Date'}
          onChange={this._handleChange('endsAt')}
          value={newDate(this.state.objective.endsAt)}
        />
        <ToggleSwitch
          label={'Private to Company'}
          isChecked={this.state.objective.isPrivate}
          onChange={this._handleChange('isPrivate')}
        />
     </Dialog>
    )
  }
}

export default ObjectiveChangeModal
