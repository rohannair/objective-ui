import React, { PropTypes } from 'react'
import styles from './Objective.css'

import Button from '../Button'

const Objective = p => {
  if (p.data) {
    return (
      <div className={styles.Objective}>
        <h4 className={styles.label}>Objective:</h4>
        <p className={styles.valueContainer}>{ p.data.name }</p>

        <h4 className={styles.label}>Key Results:</h4>
        <ul className={styles.valueContainer}>
          { p.data.key_results.map(v => <li key={`${p.id}-${v.id}`}>{v.name}</li>)}
        </ul>

        <h4 className={styles.label}>Timeline:</h4>
        <p className={styles.valueContainer}>{ p.data.timeline }</p>

        <div className={styles.actionBar}>
          <div className={styles.action} onClick={e => {
            e.preventDefault()
            p.editAction()
          }}><i className="zmdi zmdi-edit" /></div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.ObjectiveButton}>
      <Button primary onClick={p.buttonAction}>{p.buttonText}</Button>
    </div>
  )

}

export default Objective
