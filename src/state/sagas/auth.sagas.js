import { takeEvery, takeLatest  } from 'redux-saga';
import { call, put, take, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import Cookies from 'cookies-js';

import * as authActions from '../constants/auth.constants';
import * as api from '../services/api';

function* getToken(payload) {
  try {
    const auth = yield api.login(payload);
    if (auth.status) {
      throw new Error(auth.message);
    } else {
      yield put({ type: authActions.LOGIN.SUCCESS, auth });
    }
  } catch (e) {
    yield put({
      type: authActions.LOGIN.ERROR,
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
      yield put({ type: authActions.ACCEPT_INVITE.SUCCESS, auth });
    }
  } catch (e) {
    yield put({
      type: authActions.ACCEPT_INVITE.ERROR,
      message: e.message
    });
  }
}

export function* watchLoginAttempt() {
  while (true) {
    const { payload } = yield take(authActions.LOGIN.ATTEMPT);
    yield fork(getToken, payload, true);
  }
}

export function* watchLoginSuccess() {
  while (true) {
    const { payload } = yield take(authActions.LOGIN.SUCCESS);
    yield put(push('/'));
  }
}


export function* watchAcceptInviteAttempt() {
  while (true) {
    const { payload } = yield take(authActions.ACCEPT_INVITE.ATTEMPT);
    yield fork(postAcceptInvite, payload, true);
  }
}

export function* watchAcceptInviteSuccess() {
  while (true) {
    const { payload } = yield take(authActions.ACCEPT_INVITE.SUCCESS);
    yield put(push('/'));
  }
}
