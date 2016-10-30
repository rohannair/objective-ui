import {
  GET_USER_LIST
} from '../constants/users.constants';

export const getUsers = ({ limit = 25, offset = 0, sort, order }) => ({
  type: GET_USER_LIST.ATTEMPT,
  payload: { limit, offset, sort, order }
});
