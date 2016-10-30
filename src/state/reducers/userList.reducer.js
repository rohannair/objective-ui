import { fromJS, List } from 'immutable';

import * as ACTION from '../constants/users.constants';

const defaultState = new fromJS({
  offset: 0,
  limit: 25,
  results: new List()
});

export default (state = defaultState, action) => {

  switch (action.type) {
  case ACTION.GET_USER_LIST.SUCCESS:

    return state.merge(fromJS({
      offset: parseInt(action.users.nextOffset),
      limit: parseInt(action.users.nextLimit),
      results: new List(action.users.results)
    }));

  default:
    return state;
  }
};
