import { takeEvery, takeLatest  } from 'redux-saga';
import { call, put, take, fork } from 'redux-saga/effects';

import * as loginActions from '../constants/users.constants';
import * as missionActions from '../constants/missions.constants';

import * as api from '../services/api';
import { fetchEntity } from './utils';

import {
  watchGetMission,
  watchUpdateMission,
  watchAddMissionField,
  watchNewMission,
  watchNewMissionSuccess
} from './missions.sagas';

import {
  watchGetMissionList
} from './missionList.sagas';

import {
  watchGetUserList,
  watchInviteUser
} from './userList.sagas';

import {
  watchLoginAttempt,
  watchLoginSuccess
} from './auth.sagas';

import {
  watchGetUser
} from './user.sagas';

function* watchLogin() {
  while (true) {
    const { username, password } = yield take(loginActions.ATTEMPT);
    yield fork();
  }
}

export default function* root() {
  yield [
    fork(watchGetMission),
    fork(watchGetMissionList),
    fork(watchUpdateMission),
    fork(watchAddMissionField),
    fork(watchNewMission),
    fork(watchNewMissionSuccess),
    fork(watchLoginAttempt),
    fork(watchLoginSuccess),
    fork(watchGetUserList),
    fork(watchGetUser),
    fork(watchInviteUser)
  ];
}
