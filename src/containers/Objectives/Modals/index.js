import React, { Component, PropTypes } from 'react'

import TextInput from '../../../components/Forms/TextInput'
import DatePicker from '../../../components/Datepicker'
import { timestampToDate } from '../../../utils/dates'

export const ObjectiveChangeModal = ({
  defaultName,
  defaultTargetEndsAt,
  onChange
}) => (
  <div>
    <TextInput
      label="Objective name"
      onChange={onChange('name')}
      defaultValue={defaultName}
    />
    <DatePicker
      label='End date'
      onChange={onChange('targetEndsAt')}
      defaultValue={timestampToDate(defaultTargetEndsAt)}
    />
  </div>
)

export const SetOwnerModal = () => (<p>It seems like this Objective was created without an owner. Would you like to set yourself as the owner?</p>)

export const AddCollaboratorModal = () => (<div>Hello world!</div>)
