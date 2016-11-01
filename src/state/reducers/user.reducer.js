import { fromJS, List } from 'immutable';

import * as ACTION from '../constants/users.constants';

const defaultState = new fromJS({
  squads: new List(),
  missions: new List()
});

export default (state = defaultState, action) => {

  switch (action.type) {
  case ACTION.GET_USER.SUCCESS:
    return state.merge(fromJS({ ...action.payload.user }));

  default:
    return state;
  }
};
