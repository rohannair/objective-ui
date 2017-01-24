import React, { Component, PropTypes } from 'react'

import Dialog from 'react-toolbox/lib/dialog'
import TextInput from '../../../components/Forms/TextInput'

export const ObjectiveChangeModal = ({
  defaultName,
  defaultEndsAt
}) => (
  <div>
    <TextInput
      label="Objective name"
      onChange={this._handleObjectiveChange('name')}
      defaultValue={defaultName}
    />
    <DatePicker
      label='End date'
      onChange={this._handleObjectiveChange('endsAt')}
      defaultValue={defaultEndsAt}
    />
  </div>
)

export const SetOwnerModal = () => (<p>It seems like this Objective was created without an owner. Would you like to set yourself as the owner?</p>)

export const AddCollaboratorModal = () => (<div>Hello world!</div>)
