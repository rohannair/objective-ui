import * as ACTION from '../constants/users.constants';

const defaultState = {
  offset: 0,
  limit: 25,
  results: []
};

export default (state = defaultState, action) => {

  switch (action.type) {
  case ACTION.GET_USER_LIST.SUCCESS:

    return {
      ...state,
      offset: parseInt(action.users.nextOffset),
      limit: parseInt(action.users.nextLimit),
      results: [...action.users.results]
    };

  case ACTION.INVITE_USER.SUCCESS:
    return {
      ...state,
      results: [
        ...state.results,
        ...action.body.user,
        missions: [],
        squads: []
      ]
    };

  case ACTION.SEARCH_USERS.SUCCESS:
    return {
      ...state,
      results: [
        ...action.users.results
      ]
    };

  default:
    return state;
  }
};
