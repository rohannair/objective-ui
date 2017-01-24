import React, { PropTypes } from 'react'
import styled from 'styled-components'

const ObjectiveSidebarList = ({ list, className, getObjective }) => {
  let children = list.map(o => (
    <div
      key={o.id}
      className="item"
      onClick={() => getObjective(o.id) }
    >
      { o.name }
    </div>
  ))

  return (
    <div className={className}>
      { children }
    </div>
  )
}

export default styled(ObjectiveSidebarList)`
  .item {
    cursor: pointer;
    font-size: 0.85em;
    padding: 10px 20px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }
  }
`
