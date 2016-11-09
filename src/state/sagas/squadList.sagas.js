import { takeEvery, takeLatest  } from 'redux-saga';
import { call, put, take, fork } from 'redux-saga/effects';

import * as squadActions from '../constants/squads.constants';
import * as api from '../services/api';
import { fetchEntity } from './utils';

function* getSquadList() {
  try {
    const squads = yield api.fetchSquadList();
    yield put({
      type: squadActions.GET_SQUAD_LIST.SUCCESS,
      squads
    });
  } catch (e) {
    yield put({
      type: squadActions.GET_SQUAD_LIST.ERROR,
      message: e.message
    });
  }
}

function* createSquadMission(payload) {
  try {
    const {mission} = yield api.createSquadMission(payload);
    yield put({ type: squadActions.NEW_MISSION.SUCCESS, mission });
  } catch (e) {
    yield put({
      type: squadActions.NEW_MISSION.ERROR,
      message: e.message
    });
  }
}

function* editSquadObjective(payload) {
  try {
    const { mission } = yield api.editSquadObjective(payload);
    yield put({ type: squadActions.EDIT_OBJECTIVE.SUCCESS, mission });
  } catch (e) {
    yield put({
      type: squadActions.EDIT_OBJECTIVE.ERROR,
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

export function* watchEditSquadObjective() {
  while (true) {
    const { payload } = yield take(squadActions.EDIT_OBJECTIVE.ATTEMPT);
    yield fork(editSquadObjective, payload, true);
  }
}

export function* assignUserToSquad(payload) {
  try {
    const squads = yield api.assignUserToSquad(payload);
    yield put({
      type: squadActions.ASSIGN_USER_TO_SQUAD.SUCCESS,
      squads
    });
  } catch (e) {
    yield put({
      type: squadActions.ASSIGN_USER_TO_SQUAD.ERROR,
      message: e.message
    });
  }
}

export function* watchAssignUserToSquad() {
  while (true) {
    const { payload } = yield take(squadActions.ASSIGN_USER_TO_SQUAD.ATTEMPT);
    yield fork(assignUserToSquad, payload, true);
  }
}

function* createSquad(payload) {
  try {
    const { squad } = yield api.createSquad(payload);
    yield put({
      type: squadActions.NEW_SQUAD.SUCCESS,
      squad
    });
  } catch (e) {
    yield put({
      type: squadActions.NEW_SQUAD.ERROR,
      message: e.message
    });
  }
}

export function* watchCreateSquad() {
  while (true) {
    const { payload } = yield take(squadActions.NEW_SQUAD.ATTEMPT);
    yield fork(createSquad, payload, true);
  }
}


function* createUserOKR(payload) {
  try {
    const { user, userId, squadId } = yield api.createUserOKR(payload);
    yield put({
      type: squadActions.NEW_USER_OKR.SUCCESS,
      user,
      userId,
      squadId
    });
  } catch (e) {
    yield put({
      type: squadActions.NEW_USER_OKR.ERROR,
      message: e.message
    });
  }
}

export function* watchCreateUserOKR() {
  while (true) {
    const { payload } = yield take(squadActions.NEW_USER_OKR.ATTEMPT);
    yield fork(createUserOKR, payload, true);
  }
}

function* createCheckIn(payload) {
  try {
    const { user, userId, squadId } = yield api.createCheckIn(payload);
    yield put({
      type: squadActions.ADD_NEW_CHECKIN.SUCCESS,
      user,
      userId,
      squadId
    });
  } catch (e) {
    yield put({
      type: squadActions.ADD_NEW_CHECKIN.ERROR,
      message: e.message
    });
  }
}

export function* watchCreateCheckIn() {
  while (true) {
    const { payload } = yield take(squadActions.ADD_NEW_CHECKIN.ATTEMPT);
    yield fork(createCheckIn, payload, true);
  }
}
