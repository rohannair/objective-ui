import DatePicker from 'react-toolbox/lib/date_picker'

import React, { PropTypes } from 'react'
import theme from './Datepicker.css'
import { newDate } from '../../utils/dates'

const ThemedDatepicker = ({
  label,
  minDate = newDate('2017-01-01'),
  onChange,
  value
}) => (
  <DatePicker
    theme={theme}
    label={ label }
    minDate={ minDate || min_datetime }
    onChange={ onChange }
    value={ value }
  />
)

export default ThemedDatepicker
