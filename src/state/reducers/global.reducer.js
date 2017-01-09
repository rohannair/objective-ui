import * as types from '../constants/auth.constants'
import { push } from 'react-router-redux'

const defaultState = {
  user: null,
  companyId: null,
  role: null,
  message: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
  case types.LOGIN.SUCCESS:
  case types.LOAD_USER_DETAILS.SUCCESS:
    return ({
      ...state,
      companyId: action.auth.companyId,
      user: action.auth.user,
      role: action.auth.role,
      email: action.auth.email,
      message: {}
    })

  case types.RESET_PASSWORD.SUCCESS:
    return ({
      ...state,
      message: {
        status: 0,
        body: action.auth.message
      }
    })

  case types.RESET_PASSWORD.ERROR:
    return ({
      ...state,
      message: {
        status: 1,
        body: action.message
      }
    })

  default:
    return state
  };
}
