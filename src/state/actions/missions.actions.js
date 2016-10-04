import {
  UPDATE_FIELD,
  ADD_FIELD,
  GET_MISSION_ATTEMPT,
  GET_MISSION_SUCCESS,
  GET_MISSION_ERROR,
  GET_MISSION_LIST_ATTEMPT,
  GET_MISSION_LIST_SUCCESS,
  GET_MISSION_LIST_ERROR
} from 'state/constants/missions.constants';

export const updateField = (field, data) => ({
  type: UPDATE_FIELD,
  field,
  data
});

export const addField = (field) => ({
  type: ADD_FIELD,
  field
});

export const getMission = (id) => ({
  type: GET_MISSION_ATTEMPT,
  payload: { id }
});

export const getMissionList = ({limit, offset}) => ({
  type: GET_MISSION_LIST_ATTEMPT,
  payload: { limit, offset }
});

