import React from 'react'

import AutocompleteDropDown from '../../../../components/Forms/AutocompleteDropDown'

const AddCollaboratorModal = ({
  source,
  onQueryChange
}) => {
  const users = source.reduce((acc, val) => {
    acc[val.email] = `${val.email} (${val.firstName} ${val.lastName})`
    return acc
  }, {})

  console.log('users', users)

  return (
    <div>
      <AutocompleteDropDown
        label="Collaborator email"
        onChange={(v) => console.log('onChange', v)}
        onQueryChange={(v) => onQueryChange(v)}
        source={users}
      />
    </div>
  )
}


export default AddCollaboratorModal
