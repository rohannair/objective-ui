import { fromJS } from 'immutable';

import * as ACTION from '../constants/missions.constants';

const defaultState = fromJS({});
export default (state = defaultState, action) => {

  switch (action.type) {
  case ACTION.UPDATE_FIELD:
    console.log(['mission'].concat(action.field));
    return state.setIn(action.field, action.data);

  case ACTION.GET_MISSION_SUCCESS:
    return state.merge({ ...action.mission.mission });

  default:
    return state;
  }
};
