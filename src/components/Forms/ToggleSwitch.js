import React from 'react'
import Switch from 'react-toolbox/lib/switch'

const ToggleSwitch = ({
  isChecked,
  label,
  onChange
}) => {
  return <Switch
    label={label}
    onChange={onChange}
    checked={isChecked}
  />
}

export default ToggleSwitch
