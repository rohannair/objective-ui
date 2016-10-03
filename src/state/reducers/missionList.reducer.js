import { List } from 'immutable';

import * as ACTION from '../constants/missions.constants';

const defaultState = new List();
export default (state = defaultState, action) => {

  switch (action.type) {
  case ACTION.GET_MISSION_LIST_SUCCESS:
    return state.merge(new List([...action.missions.missions]));

  default:
    return state;
  }
};
