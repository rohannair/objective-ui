import { takeEvery, takeLatest  } from 'redux-saga';
import { call, put, take, fork } from 'redux-saga/effects';

import * as missionActions from '../constants/missions.constants';
import * as api from '../services/api';
import { fetchEntity } from './utils';

const fetchMission = fetchEntity.bind(null, api.fetchMission);

function* getMission(id) {
  try {
    const mission = yield api.fetchMission(id);
    yield put({type: missionActions.GET_MISSION.SUCCESS, mission});
  } catch (e) {
    yield put({type: missionActions.GET_MISSION.ERROR, message: e.message });
  }
}

function* updateMissionField(payload) {
  try {
    const updated = yield api.updateMissionField(payload);
    yield put({
      type: missionActions.UPDATE_FIELD.SUCCESS,
      payload: { ...updated, field: payload.field }
    })
  } catch (e) {
    yield put({
      type: missionActions.UPDATE_FIELD.ERROR,
      message: e.message
    });
  }
}

export function* watchGetMission() {
  while (true) {
    const { payload } = yield take(missionActions.GET_MISSION.ATTEMPT);
    yield fork(getMission, payload.id, true);
  }
}

export function* watchUpdateMission() {
  while (true) {
    const { payload } = yield take(missionActions.UPDATE_FIELD.ATTEMPT);
    yield fork(updateMissionField, payload, true);
  }
}

function* addMissionField(payload) {
  try {
    const inserted = yield api.addMissionField(payload);
    yield put({
      type: missionActions.ADD_FIELD.SUCCESS,
      payload: { ...inserted, field: payload.field }
    });
  } catch(e) {
    yield put({
      type: missionActions.ADD_FIELD.ERROR,
      message: e.message
    })
  }
}

export function* watchAddMissionField() {
  while (true) {
    const { payload } = yield take(missionActions.ADD_FIELD.ATTEMPT);
    yield fork(addMissionField, payload, true);
  }
}
