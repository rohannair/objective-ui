import React from 'react'

import AutocompleteDropDown from '../../../../components/Forms/AutocompleteDropDown'

const AddCollaboratorModal = ({
  users,
  onChange,
  email
}) => (
  <div>
    <AutocompleteDropDown
      label="Collaborator email"
      onChange={onChange('q')}
      value={email}
      source={users}
    />
  </div>
)

export default AddCollaboratorModal
