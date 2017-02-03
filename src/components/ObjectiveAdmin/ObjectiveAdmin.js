import React, { PropTypes } from 'react'
import styled from 'styled-components'

import ToggleSwitch from '../Forms/ToggleSwitch'

const ObjectiveAdmin = styled(({
  isOwner,
  isPrivate,
  onChange,
  className
}) => {
  if (!isOwner) return <div />

  return (
    <div className={className}>
      <ToggleSwitch
        isChecked={isPrivate}
        label="Private to company"
        onChange={onChange('isPrivate')}
      />
    </div>
  )
})`
  display: flex;
  background-color: #fff;
  width: 100%;
  align-items: center;
  height: 60px;
  border-top: 1px solid #efefef;
  padding: 10px 30px;
  font-size: 0.875rem;
`

export default ObjectiveAdmin
