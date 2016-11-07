import { List } from 'immutable';

import * as ACTION from '../constants/squads.constants';

const defaultState = new List();
export default (state = defaultState, action) => {

  switch (action.type) {
  case ACTION.ASSIGN_USER_TO_SQUAD.SUCCESS:
  case ACTION.GET_SQUAD_LIST.SUCCESS:
    return state.merge(new List([...action.squads.results]));

  default:
    return state;
  }
};
