
import dateformat from 'dateformat'

export const timestamp = (dt = null) => !dt ? +new Date() : +new Date(dt)

export const newDate = (dt = null) => !dt ? new Date() : new Date(dt)

export const toLocalMonthDayYear = (milliseconds) => dateformat(new Date(milliseconds), 'mmmm dd, yyyy')

export const toMonthDayHour = (date) => dateformat(date, 'mmm dd h:MM TT')
