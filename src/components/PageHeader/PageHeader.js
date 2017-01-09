import React, { PropTypes } from 'react'
import styles from './PageHeader.css'

const PageHeader = p => (
  <div className={styles.PageHeader}>
    <h2>{ p.title }</h2>
    <div className={styles.children}>
      { p.children }
    </div>
  </div>
)

export default PageHeader
