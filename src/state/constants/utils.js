export const ATTEMPT = 'ATTEMPT'
export const SUCCESS = 'SUCCESS'
export const ERROR = 'ERROR'

export const createActions = base =>
  [ATTEMPT, SUCCESS, ERROR]
    .reduce((acc, type) => {
      acc[type] = `${base}_${type}`
      return acc
    }, {})
