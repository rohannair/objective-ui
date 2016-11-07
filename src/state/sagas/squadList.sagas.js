import { takeEvery, takeLatest  } from 'redux-saga';
import { call, put, take, fork } from 'redux-saga/effects';

import * as squadActions from '../constants/squads.constants';
import * as api from '../services/api';
import { fetchEntity } from './utils';

function* getSquadList() {
  try {
    const squads = yield api.fetchSquadList();
    yield put({ type: squadActions.GET_SQUAD_LIST.SUCCESS, squads });
  } catch (e) {
    yield put({
      type: squadActions.GET_SQUAD_LIST.ERROR,
      message: e.message
    });
  }
}

function* createSquadMission(payload) {
  try {
    const mission = yield api.createSquadMission(payload);
    yield put({ type: squadActions.NEW_MISSION.SUCCESS, mission });
  } catch (e) {
    yield put({
      type: squadActions.NEW_MISSION.ERROR,
      message: e.message
    });
  }
}

export function* watchGetSquadList() {
  while (true) {
    yield take(squadActions.GET_SQUAD_LIST.ATTEMPT);
    yield fork(getSquadList, true);
  }
}

export function* watchNewSquadMission() {
  while (true) {
    const { payload } = yield take(squadActions.NEW_MISSION.ATTEMPT);
    yield fork(createSquadMission, payload, true);
  }
}

export function* assignUserToSquad(payload) {
  try {
    const squads = yield api.assignUserToSquad(payload);
    yield put({
      type: squadActions.ASSIGN_USER_TO_SQUAD.SUCCESS,
      squads
    })
  } catch (e) {
    yield put({
      type: squadActions.ASSIGN_USER_TO_SQUAD.ERROR,
      message: e.message
    })
  }
}

export function* watchAssignUserToSquad() {
  const { payload } = yield take(squadActions.ASSIGN_USER_TO_SQUAD.ATTEMPT);
  yield fork(assignUserToSquad, payload, true);
}
