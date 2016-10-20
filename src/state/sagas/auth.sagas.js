import { takeEvery, takeLatest  } from 'redux-saga';
import { call, put, take, fork } from 'redux-saga/effects';

import * as authActions from '../constants/auth.constants';
import * as api from '../services/api';
import { fetchEntity } from './utils';

function* getToken(payload) {
  try {
    const auth = yield api.login(payload);
    yield put({ type: authActions.LOGIN.SUCCESS, auth });
  } catch (e) {
    yield put({
      type: authActions.LOGIN.ERROR,
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
