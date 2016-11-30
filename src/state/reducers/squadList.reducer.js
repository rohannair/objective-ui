import * as ACTION from '../constants/squads.constants';

const defaultState = [];
export default (state = defaultState, action) => {
  let idx, edited;

  switch (action.type) {
  case ACTION.ASSIGN_USER_TO_SQUAD.SUCCESS:
  case ACTION.GET_SQUAD_LIST.SUCCESS:
    return [
      ...action.squads.results
    ];

  case ACTION.NEW_SQUAD.SUCCESS:
    return [
      action.squad,
      ...state
    ];

  case ACTION.NEW_MISSION.SUCCESS:
  case ACTION.EDIT_OBJECTIVE.SUCCESS:
    idx = state.findIndex(l => l.id === action.mission.squadId);
    edited = {
      ...state[idx],
      objectives: [ action.mission ]
    };

    return [
      ...state.slice(0, idx),
      edited,
      ...state.slice(idx + 1)
    ];

  case ACTION.ADD_NEW_CHECKIN.SUCCESS:
  case ACTION.NEW_USER_OKR.SUCCESS:
    idx = state.findIndex(l => l.id === action.squadId);
    let deepIdx = state[idx].users.findIndex(v => v.id === action.userId);

    edited = {
      ...state[idx],
      users: [
        ...state[idx].users.slice(0, deepIdx),
        action.user[0],
        ...state[idx].users.slice(deepIdx + 1)
      ]
    };

    return [
      ...state.slice(0, idx),
      edited,
      ...state.slice(idx + 1)
    ];

  default:
    return state;
  }
};
