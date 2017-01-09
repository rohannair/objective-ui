import { takeEvery, takeLatest, delay  } from 'redux-saga'
import { call, put, take, fork } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import * as types from '../constants/users.constants'
import * as api from '../services/api'
// import { fetchEntity, delay } from './utils';

function* fetchUser(id) {
  try {
    const user = yield api.fetchUser(id)
    yield put({
      type: types.GET_USER.SUCCESS,
      payload: user
    })
  } catch (e) {
    yield put({
      type: types.GET_USER.ERROR,
      message: e.message
    })
  }
}

export function* watchGetUser() {
  while (true) {
    const { payload } = yield take(types.GET_USER.ATTEMPT)
    yield fork(fetchUser, payload.id, true)
  }
}

function* editUser(payload) {
  try {
    const user = yield api.editUser(payload)
    yield put({
      type: types.EDIT_USER.SUCCESS,
      payload: user
    })

    yield delay(3000)

    yield put({
      type: types.CLEAR_USER_MESSAGE
    })

  } catch (e) {
    yield put({
      type: types.EDIT_USER.ERROR,
      message: e.message
    })

    yield delay(4000)

    yield put({
      type: types.CLEAR_USER_MESSAGE
    })
  }
}

export function* watchEditUser() {
  while (true) {
    const { payload } = yield take(types.EDIT_USER.ATTEMPT)
    yield fork(editUser, payload, true)
  }
}
