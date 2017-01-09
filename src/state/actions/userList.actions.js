import {
  GET_USER_LIST,
  INVITE_USER,
  SEARCH_USERS
} from '../constants/users.constants'

export const getUsers = ({ limit = 25, offset = 0, sort, order }) => ({
  type: GET_USER_LIST.ATTEMPT,
  payload: { limit, offset, sort, order }
})

export const inviteUser = (payload) => ({
  type: INVITE_USER.ATTEMPT,
  payload
})

export const searchUsers = (query) => ({
  type: SEARCH_USERS.ATTEMPT,
  payload: {
    query
  }
})
