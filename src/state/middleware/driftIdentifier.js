import { LOAD_USER_DETAILS } from '../constants/auth.constants'

const drift = window.drift ? window.drift : () => {}
const identified = window.identified = false

const driftLogger = store => next => action => {
  if (action.type === LOAD_USER_DETAILS.SUCCESS) {
    isDriftIn(driftIdentify.bind(this, action))
  }
  return next(action)
}

const driftIdentify = (action) => {
  drift.identify(
    action.auth.user,
    {
      email: action.auth.email,
      companyId: action.auth.companyId
    }
  )
}

const isDriftIn = (cb) => {
  if (window.driftLoaded) {
    cb()
  } else setTimeout(isDriftIn(cb), 100)
}

export default driftLogger
