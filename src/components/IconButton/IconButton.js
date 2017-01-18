import React from 'react'
import styles from './IconButton.css'

import Tooltip from 'react-toolbox/lib/tooltip'

const IconButton = p => {
  const classes = p.checked
    ? styles.iconbutton__checked
    : styles.iconbutton

  return (
    <div className={classes} onClick={p.onClick.bind(this, !p.checked)}>
      <i className={`zmdi zmdi-${p.icon}`} />
      { p.children }
    </div>
  )
}

export default Tooltip(IconButton)
