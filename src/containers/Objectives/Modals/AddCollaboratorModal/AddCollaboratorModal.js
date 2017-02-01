import React from 'react'

import AutocompleteDropDown from '../../../../components/Forms/AutocompleteDropDown'

const AddCollaboratorModal = ({
  source,
  onQueryChange,
  onChange
}) => {
  const users = source.reduce((acc, val) => {
    acc[val.email] = `${val.email} (${val.firstName} ${val.lastName})`
    return acc
  }, {})

  console.log('users', users)

  const handleOnChange = (val) => {
    const user = source.find((v) => {
      return val == v.email
    })

    onChange(user.id)
  }

  return (
    <div>
      <AutocompleteDropDown
        label="Collaborator email"
        onChange={handleOnChange}
        onQueryChange={(v) => onQueryChange(v)}
        source={users}
      />
    </div>
  )
}


export default AddCollaboratorModal
