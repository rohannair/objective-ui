import {
  GET_USER,
  EDIT_USER,
  CLEAR_USER_MESSAGE
} from '../constants/users.constants'

export const getUser = (id) => ({
  type: GET_USER.ATTEMPT,
  payload: { id }
})

export const editUser = (payload) => ({
  type: EDIT_USER.ATTEMPT,
  payload
})

export const clearMessage = () => ({
  type: CLEAR_USER_MESSAGE
})
