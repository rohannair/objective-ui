import { takeEvery, takeLatest  } from 'redux-saga';
import { call, put, take, fork } from 'redux-saga/effects';

import * as loginActions from 'state/constants/users.constants';

function* watchLogin() {
  while(true) {
    const { username, password } = yield take(loginActions.ATTEMPT);
    yield fork()
  }
}

export default function* root() {
  yield [
    fork(watchLogin)
  ];
}
