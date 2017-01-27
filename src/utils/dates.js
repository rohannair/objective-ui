/*This modules formats dates as required.*/
import dateformat from 'dateformat'

export const timestamp = (dt = null) => !dt ? +new Date() : +new Date(dt)

export const newDate = (dt = null) => !dt ? new Date() : new Date(dt)

export const toLocalMonthDayYear = (milliseconds) => {
  const dt = new Date(milliseconds)
  const date = dateformat(dt, 'mmmm dd, yyyy')
  return date
}
