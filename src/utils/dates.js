/*This modules formats dates as required.*/
import dateformat from 'dateformat'

export const toTimestamp = (dt) => {
  const date = +new Date(dt)
  return date
}

export const newDate = (dt) => {
  let date = new Date(dt)
  return date
}

export const timestampNow = () => {
  let date = Date.now()
  return date
}

export const toLocalMonthDayYear = (milliseconds) => {
  const intDate = parseInt(milliseconds)
  const dt = new Date(intDate)
  const date = dateformat(dt, 'mmmm dd, yyyy')
  return date
}

export const timestampToDate = (milliseconds) => {
  const intDate = parseInt(milliseconds)
  const date = new Date(intDate)
  return date
}
