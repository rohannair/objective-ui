import {
  UPDATE_FIELD,
  ADD_FIELD,
  GET_MISSION,
  GET_MISSION_LIST,
} from 'state/constants/missions.constants';

export const updateField = (id, field, data) => ({
  type: UPDATE_FIELD.ATTEMPT,
  payload: { id, field, data }
});

export const addField = (id, field) => ({
  type: ADD_FIELD.ATTEMPT,
  payload: {
    field,
    id
  }
});

export const getMission = (id) => ({
  type: GET_MISSION.ATTEMPT,
  payload: { id }
});

export const getMissionList = ({limit, offset}) => ({
  type: GET_MISSION_LIST.ATTEMPT,
  payload: { limit, offset }
});

