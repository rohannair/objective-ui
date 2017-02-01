import React from 'react'
import styled from 'styled-components'

import Avatar from 'react-toolbox/lib/avatar'
import Tooltip from 'react-aria-tooltip'

const ObjectiveCollaboratorBar = styled(({
  objective,
  className,
  setOwner,
  addCollaborator
}) => {
  if (!objective) return null

  const ownerAvatar = objective.owner
  ? (<Avatar className={'ownerAvatar'} image={objective.owner.img} cover />)
  : (<Tooltip message="Claim ownership" eventType="hover" direction="bottom">
       <Avatar className={'noOwnerAvatar'} title="?" onClick={setOwner} />
     </Tooltip>)

  let filteredCollborators = objective.collaborators

  if (filteredCollborators && objective.owner) {
    filteredCollborators = filteredCollborators.filter(u => u.id != objective.owner.id)
  }

  const collaborators = filteredCollborators && filteredCollborators.map(u => <Avatar key={u.id} className={'avatar'} image={u.img} />)

  return (
    <div className={className}>
      Owner:
      { ownerAvatar }

      Collaborators:
      { collaborators }

      <Tooltip message="Add Collaborators" eventType="hover" direction="bottom">
        <Avatar className={'addCollaboratorAvatar'} title="+" onClick={addCollaborator} />
      </Tooltip>
    </div>
  )
})`
  display: flex;
  background-color: #fff;
  width: 100%;
  align-items: center;
  height: 60px;
  line-height: 60px;
  border-top: 1px solid #efefef;
  padding: 10px 30px;
  font-size: 0.875rem;

  .avatar,
  .ownerAvatar,
  .noOwnerAvatar,
  .addCollaboratorAvatar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    line-height: 36px;
    width: 36px;
    margin: 0 10px;
  }

  .ownerAvatar {
    border: 2px #009ed9 solid;
  }

  .noOwnerAvatar {
    font-weight: bold;
  }

  .addCollaboratorAvatar {
    line-height: 1;
    cursor: pointer;
    background-color: #fff;
    border: 1px dashed #009ed9;
    color: #009ed9;
  }
`

export default ObjectiveCollaboratorBar
