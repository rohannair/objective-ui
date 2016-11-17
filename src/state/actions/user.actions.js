import {
  GET_USER,
  EDIT_USER
} from '../constants/users.constants';

export const getUser = (id) => ({
  type: GET_USER.ATTEMPT,
  payload: { id }
});

export const editUser = (payload) => ({
  type: EDIT_USER.ATTEMPT,
  payload
});
