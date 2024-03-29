import { takeEvery, takeLatest  } from 'redux-saga'
import { call, put, take, fork } from 'redux-saga/effects'

import * as loginActions from '../constants/users.constants'
import * as missionActions from '../constants/missions.constants'

import * as api from '../services/api'
import { fetchEntity } from './utils'

import {
  watchGetMission,
  watchUpdateMission,
  watchAddMissionField,
  watchNewMission,
  watchNewMissionSuccess
} from './missions.sagas'

import {
  watchGetMissionList
} from './missionList.sagas'

import {
  watchGetUserList,
  watchInviteUser,
  watchSearchUsers
} from './userList.sagas'

import {
  watchLoginAttempt,
  watchLoginSuccess,
  watchAcceptInviteAttempt,
  watchAcceptInviteSuccess,
  watchGlobalObject,
  watchResetPasswordAttempt
} from './auth.sagas'

import {
  watchCreateUserAttempt,
  watchCreateUserSuccess
} from './auth/createUser.sagas'

import {
  watchGetUser,
  watchEditUser
} from './user.sagas'

import {
  watchGetSquadList,
  watchNewSquadMission,
  watchAssignUserToSquad,
  watchCreateSquad,
  watchCreateUserOKR,
  watchCreateCheckIn,
  watchEditSquadObjective
} from './squadList.sagas'

function* watchLogin() {
  while (true) {
    const { username, password } = yield take(loginActions.ATTEMPT)
    yield fork()
  }
}

export default function* root() {
  yield [
    fork(watchLoginAttempt),
    fork(watchLoginSuccess),
    fork(watchAcceptInviteAttempt),
    fork(watchAcceptInviteSuccess),
    fork(watchGlobalObject),
    fork(watchResetPasswordAttempt),

    fork(watchGetUser),
    fork(watchEditUser),

    fork(watchGetUserList),
    fork(watchSearchUsers),
    fork(watchInviteUser),

    fork(watchAssignUserToSquad),
    fork(watchGetSquadList),
    fork(watchCreateSquad),
    fork(watchNewSquadMission),

    fork(watchCreateUserOKR),
    fork(watchCreateCheckIn),
    fork(watchEditSquadObjective),

    fork(watchCreateUserAttempt),
    fork(watchCreateUserSuccess)
  ]
}
