import React, { PropTypes } from 'react'
import styled from 'styled-components'

import ToggleSwitch from '../Forms/ToggleSwitch'

const ObjectiveAdmin = styled(({
  isOwner,
  objective,
  onPrivateChange,
  className
}) => {
  if (!isOwner) return <div />

  return (
    <div className={className}>
      <ToggleSwitch
        isChecked={objective.isPrivate}
        label="Private to company"
        onChange={onPrivateChange}
      />
    </div>
  )
})`
  display: flex;
  flex-direction: row;
  align-items: center;

  background-color: #fff;
  width: 100%;
  border-top: 1px solid #efefef;
  padding: 10px 30px;
  font-size: 0.875rem;
`

export default ObjectiveAdmin
