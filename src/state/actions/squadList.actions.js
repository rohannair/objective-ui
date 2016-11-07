import {
  GET_SQUAD_LIST,
  NEW_MISSION,
  NEW_SQUAD,
  ASSIGN_USER_TO_SQUAD,
  NEW_USER_OKR
} from '../constants/squads.constants';

export const getSquadList = () => ({
  type: GET_SQUAD_LIST.ATTEMPT
});

export const newSquadMission = (payload) => ({
  type: NEW_MISSION.ATTEMPT,
  payload
});

export const editSquadMission = () => ({

});

export const createSquad = (payload) => ({
  type: NEW_SQUAD.ATTEMPT,
  payload
});

export const addUserToSquad = (payload) => ({
  type: ASSIGN_USER_TO_SQUAD.ATTEMPT,
  payload
});

export const newUserOKR = payload => ({
  type: NEW_USER_OKR.ATTEMPT,
  payload
});
