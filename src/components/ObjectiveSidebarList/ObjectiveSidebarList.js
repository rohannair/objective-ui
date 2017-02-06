import React, { PropTypes } from 'react'
import styled from 'styled-components'
import FontIcon from 'react-toolbox/lib/font_icon'

const ObjectiveSidebarList = ({ list, className, getObjective }) => {
  const objectiveLock = ({ isPrivate }) => isPrivate ? <FontIcon value='lock' /> : null

  let children = list.map(o => (
    <div
      key={o.id}
      className="item"
      onClick={() => getObjective(o.id) }
    >
      { objectiveLock(o) }
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

  .material-icons {
    font-size: 1rem;
    padding-right: .2rem;
    position: relative;
    top: .2rem;
  }
`
