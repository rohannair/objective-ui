import {
  GET_SQUAD_LIST,
  NEW_MISSION,
  ASSIGN_USER_TO_SQUAD
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

export const createSquad = () => ({

});

export const addUserToSquad = (payload) => ({
  type: ASSIGN_USER_TO_SQUAD.ATTEMPT,
  payload
});
