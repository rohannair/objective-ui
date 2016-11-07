import { takeEvery, takeLatest  } from 'redux-saga';
import { call, put, take, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import * as userActions from '../constants/users.constants';
import * as api from '../services/api';
import { fetchEntity, delay } from './utils';

function* fetchUser(id) {
  try {
    const user = yield api.fetchUser(id);
    yield put({
      type: userActions.GET_USER.SUCCESS,
      payload: user
    });
  } catch (e) {
    yield put({
      type: userActions.GET_USER.ERROR,
      message: e.message
    });
  }
}
export function* watchGetUser() {
  while (true) {
    const { payload } = yield take(userActions.GET_USER.ATTEMPT);
    yield fork(fetchUser, payload.id, true);
  }
}
