import { takeEvery, takeLatest  } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import Cookies from 'cookies-js';

import { COOKIE_NAME } from '../../utils/auth';
import jwtDecode from 'jwt-decode';

import * as types from '../constants/auth.constants';
import * as api from '../services/api';

function* getToken(payload) {
  try {
    const auth = yield api.login(payload);
    if (auth.status) {
      throw new Error(auth.message);
    } else {
      yield put({ type: types.LOGIN.SUCCESS, auth });
    }
  } catch (e) {
    yield put({
      type: types.LOGIN.ERROR,
      message: e.message
    });
  }
}

function* postAcceptInvite(payload) {
  try {
    const auth = yield api.acceptInvite(payload);
    if (auth.status) {
      throw new Error(auth.message);
    } else {
      yield put({ type: types.ACCEPT_INVITE.SUCCESS, auth });
    }
  } catch (e) {
    yield put({
      type: types.ACCEPT_INVITE.ERROR,
      message: e.message
    });
  }
}

function* resetPassword(payload) {
  try {
    const auth = yield api.resetPassword(payload);
    yield put({ type: types.RESET_PASSWORD.SUCCESS, auth });
  } catch (e) {
    yield put({
      type: types.RESET_PASSWORD.ERROR,
      message: e.message
    });
  }
}

export function* watchResetPasswordAttempt() {
  while (true) {
    const { payload } = yield take(types.RESET_PASSWORD.ATTEMPT);
    yield fork(resetPassword, payload, true);
  }
}

export function* watchLoginAttempt() {
  while (true) {
    const { payload } = yield take(types.LOGIN.ATTEMPT);
    yield fork(getToken, payload, true);
  }
}

export function* watchLoginSuccess() {
  while (true) {
    yield take(types.LOGIN.SUCCESS);
    location.reload();
    yield put(push('/'));
  }
}

export function* watchAcceptInviteAttempt() {
  while (true) {
    const { payload } = yield take(types.ACCEPT_INVITE.ATTEMPT);
    yield fork(postAcceptInvite, payload, true);
  }
}

export function* watchAcceptInviteSuccess() {
  while (true) {
    const { payload } = yield take(types.ACCEPT_INVITE.SUCCESS);
    location.reload();
    yield put(push('/'));
  }
}

export function* watchGlobalObject() {
  while (true) {
    const action = yield take();
    const state = yield isGlobalEmpty();
    if (state) {
      yield fork(getUserDetails, {}, true);
    }
  }
}

function* isGlobalEmpty() {
  const state = yield select(state => state.global);
  return !(!!state.user || !!state.companyID);
}

function* getUserDetails() {
  const cookie = localStorage.getItem(COOKIE_NAME);
  if (!cookie) return;

  const token = jwtDecode(cookie);
  yield put({
    type: types.LOAD_USER_DETAILS.SUCCESS,
    auth: {
      user: token.app_metadata.oiq_id,
      companyId: token.app_metadata.oiq_id,
      role: token.role,
      email: token.email
    }
  });
}
