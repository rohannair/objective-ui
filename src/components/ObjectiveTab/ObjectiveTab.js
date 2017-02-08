import React, { PropTypes } from 'react'
import dateformat from 'dateformat'
import Pill from '../Pill'
import { toMonthDayHour } from '../../utils/dates'
import SplitIconPill from '../SplitIconPill'

const ObjectiveTab = p => (
  <div style={{
    display: 'flex',
    alignItems: 'baseline'
  }}
  className='objectiveTab'
  >
  	{ p.objective
      ? (
        	<SplitIconPill readOnly={p.readOnly} info iconAction={p.editObjective} icon='edit'>{p.objective.name}</SplitIconPill>
        )
  	  : (
          <SplitIconPill transparent action={p.editObjective} iconAction={p.editObjective} icon='plus'>Add Objective</SplitIconPill>
        )
    }
	{ p.blocker && <Pill danger><i className={'zmdi zmdi-alert-circle-o'} /> BLOCKER!</Pill>}
	<small>{toMonthDayHour(p.createdAt)}</small>
  </div>
)

export default ObjectiveTab
