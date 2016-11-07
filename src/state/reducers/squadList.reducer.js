import { List } from 'immutable';

import * as ACTION from '../constants/squads.constants';

const defaultState = new List();
export default (state = defaultState, action) => {

  switch (action.type) {
  case ACTION.ASSIGN_USER_TO_SQUAD.SUCCESS:
  case ACTION.GET_SQUAD_LIST.SUCCESS:
    return state.merge(new List([...action.squads.results]));

  case ACTION.NEW_SQUAD.SUCCESS:
    return state.unshift(action.squad)

  case ACTION.NEW_MISSION.SUCCESS:
    const { mission } = action;
    return state.update(
      state.findIndex(l => l.id === action.mission.squadId),
      o => ({ ...o, objectives: [ ...o.objectives, mission ] })
    );

  case ACTION.NEW_USER_OKR.SUCCESS:
  return state.update(
    state.findIndex(l => l.id === action.squadId),
    b => {
      const i = b.users.findIndex(v => v.id === action.userId);
      return {
        ...b,
        users: [
          ...b.users.slice(0, i),
          action.user[0],
          ...b.users.slice(i + 1)
        ]
      }
    }
  )

  default:
    return state;
  }
};
