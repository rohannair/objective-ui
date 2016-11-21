import { fromJS, List } from 'immutable';

import * as ACTION from '../constants/users.constants';

const defaultState = new fromJS({
  squads: new List(),
  missions: new List(),
  message: null
});

export default (state = defaultState, action) => {
  switch (action.type) {

  case ACTION.EDIT_USER.SUCCESS:
  case ACTION.GET_USER.SUCCESS:
    const message = action.type === ACTION.EDIT_USER.SUCCESS
      ? 'success'
      : null;

    return state.merge(fromJS({
      ...action.payload.user,
      message
    }));

  case ACTION.EDIT_USER.ERROR:
  case ACTION.GET_USER.ERROR:
    return state.merge(fromJS({ message: 'failure' }));

  case ACTION.CLEAR_USER_MESSAGE:
    return state.merge(fromJS({ message: null }));

  default:
    return state;
  }
};
