import DatePicker from 'react-toolbox/lib/date_picker'

import React, { PropTypes } from 'react'
import theme from './Datepicker.css'

const datetime = new Date(2015, 10, 16)
const min_datetime = new Date(new Date(datetime).setDate(8))

const ThemedDatepicker = p => (
  <DatePicker
    theme={theme}
    label={ p.label }
    minDate={ min_datetime }
    onChange={ p.onChange }
    defaultValue={ p.defaultValue }
  />
)

export default ThemedDatepicker
