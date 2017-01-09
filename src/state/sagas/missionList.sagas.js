import { takeEvery, takeLatest  } from 'redux-saga'
import { call, put, take, fork } from 'redux-saga/effects'

import * as missionActions from '../constants/missions.constants'
import * as api from '../services/api'
import { fetchEntity } from './utils'

function* getMissionList({ limit, offset }) {
  try {
    const missions = yield api.fetchMissionList(limit, offset)
    yield put({ type: missionActions.GET_MISSION_LIST.SUCCESS, missions })
  } catch (e) {
    yield put({
      type: missionActions.GET_MISSION_LIST.ERROR,
      message: e.message
    })
  }
}

export function* watchGetMissionList() {
  while (true) {
    const { payload } = yield take(missionActions.GET_MISSION_LIST.ATTEMPT)
    yield fork(getMissionList, payload, true)
  }
}
