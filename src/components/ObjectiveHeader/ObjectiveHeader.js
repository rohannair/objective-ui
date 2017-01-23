import React, { PropTypes } from 'react'
import gql from 'graphql-tag'

import styles from './ObjectiveHeader.css'
import Avatar from 'react-toolbox/lib/avatar'
import dateformat from 'dateformat'

const ObjectiveHeader = p => {
  if (!p.objective) return null

  const menu = (
    <div className={styles.moreMenu}>
      <i className="zmdi zmdi-more-vert" />
      <div className={styles.dropdown}>
        { p.dropdownOptions.map((o, i) => (
          <div key={i} onClick={o.onClick} className={styles.dropdown__item}>
            {o.icon && <i className={`zmdi zmdi-${o.icon}`} />}
            {o.name}
          </div>
        ))}
      </div>
    </div>
  )

  const ownerAvatar = p.objective.owner
  ? (<Avatar className={styles.ownerAvatar} image={p.objective.owner.img} cover />)
  : (<Avatar className={styles.noOwnerAvatar} title="?" onClick={p.setOwner} />)

  const addMore = <Avatar className={styles.addCollaboratorAvatar} title="+" />

  return (
    <div className={styles.objectiveHeader}>
      <div className={styles.contributorHeader}>
        { p.menuLeft && menu}
        <h3>{p.objective.name}</h3>
        <div className={styles.meta}>
          Target end date: { dateformat(p.objective.endsAt, 'mmmm dd, yyyy') || 'N/A' }
        </div>
        { p.menuRight && menu}
      </div>

      <div className={styles.contributorBar}>
        Contributors:
        { ownerAvatar }
        {
          p.collaborators && p.collaborators.map(u => (
            <Avatar key={u.id} className={styles.avatar}>
              <img src={u.img} />
            </Avatar>
          ))
        }
        { addMore }
      </div>
    </div>
  )
}

ObjectiveHeader.fragments = {
  objective: gql`
    fragment ObjectiveHeaderFragment on Objective {
      name
      endsAt
      status
      owner {
        id
        img
        firstName
        lastName
      }
      collaborators {
        id
        firstName
        lastName
        img
      }
    }
  `,
}

export default ObjectiveHeader
