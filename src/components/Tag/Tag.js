import React, { PropTypes } from 'react'
import styles from './Tag.css'

const Tag = p => (
  <div className={styles.Tag}>
    { p.children }
    <div className={styles.action} onClick={p.onClick}>&times;</div>
  </div>
)

export default Tag
