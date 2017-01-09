import React, { PropTypes } from 'react'
import gql from 'graphql-tag'

import styles from './UserTab.css'

const UserTab = p => (
  <div className={styles.UserTab}>
    <div className={styles.avatarContainer}>
      <img src={p.img} className={styles.avatar} />
    </div>
    <div className={styles.content}>
      <h3 className={styles.name}>{p.firstName} {p.lastName}</h3>
      { p.children }
    </div>
  </div>
)

UserTab.fragments = {
  user: gql`
    fragment UserTabFragment on User {
      firstName
      lastName
      img
    }
  `
}

export default UserTab
