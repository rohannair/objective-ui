import { call, put, take, fork } from 'redux-saga/effects';
import * as userListActions from '../constants/users.constants';
import * as api from '../services/api';

function* getUserList({ limit, offset, sort, order}) {
  try {
    const users = yield api.fetchUserList(limit, offset, sort, order);
    yield put({ type: userListActions.GET_USER_LIST.SUCCESS, users })
  } catch (e) {
    yield put({
      type: userListActions.GET_USER_LIST.ERROR,
      message: e.message
    })
  }
}

function* inviteUser(payload) {
  try {
    const body = yield api.inviteUser(payload);
    yield put({ type: userListActions.INVITE_USER.SUCCESS, body })
  } catch (e) {
    yield put({
      type: userListActions.INVITE_USER.ERROR,
      message: e.message
    })
  }
}

export function* watchGetUserList() {
  while(true) {
    const { payload } = yield take(userListActions.GET_USER_LIST.ATTEMPT);
    yield fork(getUserList, payload, true);
  }
}

export function* watchInviteUser() {
  while(true) {
    const { payload } = yield take(userListActions.INVITE_USER.ATTEMPT);
    yield fork(inviteUser, payload, true);
  }
}
