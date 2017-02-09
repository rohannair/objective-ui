import React from 'react'
import Checkbox from 'react-toolbox/lib/checkbox'

const Check = ({
  isChecked,
  label,
  onChange,
  className
}) => {

  return <Checkbox
    checked={isChecked}
    label={label}
    onChange={onChange}
    className={className} />
}

export default Check
