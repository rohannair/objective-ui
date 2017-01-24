import DatePicker from 'react-toolbox/lib/date_picker'

import React, { PropTypes } from 'react'
import theme from './Datepicker.css'

const ThemedDatepicker = ({
  label,
  minDate = new Date('2017-01-01'),
  onChange,
  defaultValue
}) => (
  <DatePicker
    theme={theme}
    label={ label }
    minDate={ minDate || min_datetime }
    onChange={ onChange }
    defaultValue={ defaultValue }
  />
)

export default ThemedDatepicker
