import React, { PropTypes } from 'react'
import styles from './ControlBar.css'

const ControlBar = ({ children }) => (
  <div className={styles.controlBar}>
    { children }
  </div>
)

export default ControlBar
