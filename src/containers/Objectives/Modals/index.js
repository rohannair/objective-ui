import React, { Component, PropTypes } from 'react'

import TextInput from '../../../components/Forms/TextInput'
import DatePicker from '../../../components/Datepicker'
import { newDate } from '../../../utils/dates'
import ToggleSwitch from '../../../components/Forms/ToggleSwitch'

export class ObjectiveChangeModal extends Component {
  static propTypes = {
    defaultName: PropTypes.string,
    defaultEndsAt: PropTypes.number,
    onChange: PropTypes.func,
    isPrivate: PropTypes.bool,
    onPrivateChange: PropTypes.func,
  };

  constructor(props) {
    super(props)

    this.state = {
      isPrivate: this.props.isPrivate
    }
  }

  _onPrivacyChange = () => {
    this.props.onPrivacyChange(this.state.isPrivate)
  }

  _handlePrivacyChange = () => {
    this.setState(prev => ({
      ...prev,
      isPrivate: !prev.isPrivate
    }),
      this._onPrivacyChange
    )
  }

  render() {

    const { onChange, defaultEndsAt, defaultName } = this.props

    return (
    <div>
      <TextInput
        label="Objective name"
        onChange={onChange('name')}
        defaultValue={defaultName}
      />
      <DatePicker
        label='End date'
        onChange={onChange('endsAt')}
        defaultValue={newDate(defaultEndsAt)}
      />
      <ToggleSwitch
        isChecked={this.state.isPrivate}
        label="Private to company"
        onChange={this._handlePrivacyChange}
      />
    </div>
    )
  }
}

export const SetOwnerModal = () => (<p>It seems like this Objective was created without an owner. Would you like to set yourself as the owner?</p>)
