import { call, put, take, fork, select } from 'redux-saga/effects'
import { CREATE_USER } from 'state/constants/auth.constants'
import { postPublic } from 'state/services/api'

function* createUser(payload) {
  try {
    const { data } = yield postPublic('createUser', payload)
    yield put({ type: CREATE_USER.SUCCESS, data })
  } catch (e) {
    yield put({
      type: CREATE_USER.ERROR,
      message: e.message
    })
  }
}

export function* watchCreateUserAttempt() {
  while (true) {
    const { payload } = yield take(CREATE_USER.ATTEMPT)
    yield fork(createUser, payload, true)
  }
}

export function* watchCreateUserSuccess() {
  while (true) {
    const { data: { token, state } } = yield take(CREATE_USER.SUCCESS)
    window.location.replace(`https://objective.auth0.com/continue?token=${token}&state=${state}`)
  }
}
