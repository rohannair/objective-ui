import React from 'react'

import AutocompleteDropDown from '../../components/Forms/AutocompleteDropDown'

const EditSnapshotObjectiveModal = ({
  source,
  onQueryChange,
  onChange
}) => {
  const objectives = source.reduce((acc, val) => {
    acc[val.name] = `${val.name}`
    return acc
  }, {})

  const handleOnChange = (val) => {
    const objective = source.find((v) => {
      return val === v.name
    })

    onChange(objective.id)
  }

  return (
    <div>
      <AutocompleteDropDown
        label="Objective name"
        onChange={handleOnChange}
        onQueryChange={onQueryChange}
        source={objectives}
      />
    </div>
  )
}

export default EditSnapshotObjectiveModal
