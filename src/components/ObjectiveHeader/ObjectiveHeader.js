import React, { PropTypes } from 'react'
import gql from 'graphql-tag'

import styles from './ObjectiveHeader.css'
import { toLocalMonthDayYear } from '../../utils/dates'
import FontIcon from 'react-toolbox/lib/font_icon'

const ObjectiveHeader = p => {
  if (!p.objective) return null

  const objectiveLock = p.objective.isPrivate
  ? <FontIcon value='lock' className={styles.lockIcon} />
  : null


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

  return (
    <div className={styles.objectiveHeader}>
      { p.menuLeft && p.isOwner && menu}
      <h3>
        {objectiveLock}
        {p.objective.name}
      </h3>
      <div className={styles.meta}>
       Target end date: { toLocalMonthDayYear(p.objective.endsAt) || 'N/A' }
      </div>
      { p.menuRight && menu}
    </div>
  )
}

ObjectiveHeader.fragments = {
  objective: gql`
    fragment ObjectiveHeaderFragment on Objective {
      name
      endsAt
      status
      isPrivate
      owner {
        id
        img
        firstName
        lastName
      }
      collaborators {
        user {
          id
          firstName
          lastName
          img
        }
      }
    }
  `,
}

export default ObjectiveHeader
