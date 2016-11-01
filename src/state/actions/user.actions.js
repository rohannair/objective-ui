import {
  GET_USER
} from '../constants/users.constants';

export const getUser = (id) => ({
  type: GET_USER.ATTEMPT,
  payload: { id }
});

