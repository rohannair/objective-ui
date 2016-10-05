import { fromJS, List } from 'immutable';
import omit from 'lodash/omit';

import * as ACTION from '../constants/missions.constants';

const defaultState = fromJS({});
export default (state = defaultState, action) => {

  switch (action.type) {
  case ACTION.UPDATE_FIELD.SUCCESS:
    return state.mergeIn(action.payload.field, action.payload.updated);

  case ACTION.GET_MISSION.SUCCESS:
    return state.merge({ ...action.mission.mission });

  case ACTION.ADD_FIELD.SUCCESS:
    return state.updateIn(action.payload.field, arr => arr.push(fromJS(action.payload.inserted)));

  default:
    return state;
  }
};
