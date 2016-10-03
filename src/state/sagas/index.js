import { takeEvery, takeLatest  } from 'redux-saga';
import { call, put, take, fork } from 'redux-saga/effects';

import * as loginActions from '../constants/users.constants';
import * as missionActions from '../constants/missions.constants';

import * as api from '../services/api';

function* fetchEntity(entity, apiFn, id, url) {
  yield put(entity.request(id));
  const {response, error} = yield call(apiFn, url || id);
  if (response) {
    yield put(entity.success(id, response));
  } else {
    yield put(entity.failure(id, error));
  }
}

export const fetchMission = fetchEntity.bind(null, api.fetchMission);

function* watchLogin() {
  while (true) {
    const { username, password } = yield take(loginActions.ATTEMPT);
    yield fork();
  }
}

function* getMission(id) {
  try {
    const mission = yield api.fetchMission(id);
    yield put({type: missionActions.GET_MISSION_SUCCESS, mission});
  } catch (e) {
    yield put({type: missionActions.GET_MISSION_ERROR, message: e.message });
  }
}

function* getMissionList({ limit, offset }) {
  try {
    const missions = yield api.fetchMissionList(limit, offset);
    yield put({ type: missionActions.GET_MISSION_LIST_SUCCESS, missions });
  } catch (e) {
    yield put({
      type: missionActions.GET_MISSION_LIST_ERROR,
      message: e.message
    });
  }
}

function* watchGetMission() {
  while (true) {
    const { payload } = yield take(missionActions.GET_MISSION_ATTEMPT);
    yield fork(getMission, payload.id, true);
  }
}

function* watchGetMissionList() {
  while (true) {
    const { payload } = yield take(missionActions.GET_MISSION_LIST_ATTEMPT);
    yield fork(getMissionList, payload, true);
  }
}

export default function* root() {
  yield [
    fork(watchLogin),
    fork(watchGetMission),
    fork(watchGetMissionList)
  ];
}
