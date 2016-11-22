import { fromJS } from 'immutable';
import * as types from '../constants/auth.constants';

const defaultState = fromJS({
  user: null,
  companyId: null,
  role: null
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.LOGIN.SUCCESS:
    case types.LOAD_USER_DETAILS.SUCCESS:
      return state.merge(fromJS({
        companyId: action.auth.companyId,
        user: action.auth.user,
        role: action.auth.role,
        email: action.auth.email
      }));

    default:
      return state;
  };
};
