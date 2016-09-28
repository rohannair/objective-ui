import { fromJS } from 'immutable';
import MOCK from '../../../mocks/missionMock';

import * as ACTION from 'state/constants/missions.constants'

const defaultState = fromJS(MOCK);
export default (state = defaultState, action) => {

  switch (action.type) {
    case ACTION.UPDATE_FIELD:
    return state.setIn(action.field, action.data);

    default:
    return state;
  }
}
