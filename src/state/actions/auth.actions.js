import {
  LOGIN,
  ACCEPT_INVITE,
  RESET_PASSWORD,
  CREATE_USER
} from '../constants/auth.constants'

export const tryLogin = auth => ({
  type: LOGIN.ATTEMPT,
  payload: auth
})

export const tryAcceptInvite = auth => ({
  type: ACCEPT_INVITE.ATTEMPT,
  payload: auth
})

export const tryPasswordReset = auth => ({
  type: RESET_PASSWORD.ATTEMPT,
  payload: {
    email: auth.username
  }
})

export const tryCreateUser = payload => ({
  type: CREATE_USER.ATTEMPT,
  payload
})
