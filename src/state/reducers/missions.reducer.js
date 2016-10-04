import { fromJS, List } from 'immutable';

import * as ACTION from '../constants/missions.constants';

const defaultState = fromJS({});
export default (state = defaultState, action) => {

  switch (action.type) {
  case ACTION.UPDATE_FIELD:
    console.log(['mission'].concat(action.field));
    return state.setIn(action.field, action.data);

  case ACTION.GET_MISSION_SUCCESS:
    return state.merge({ ...action.mission.mission });

  case ACTION.ADD_FIELD:
    if (state.get(action.field[0]) instanceof List) {
      const idx = state.get(action.field[0]).size;
      return state.updateIn(action.field, arr => arr.push(fromJS({
        id: undefined,
        name: undefined
      })));
    }

  default:
    return state;
  }
};
