/////////// Fetch Entity ///////////
export function* fetchEntity(entity, apiFn, id, url) {
  yield put(entity.request(id));
  const {response, error} = yield call(apiFn, url || id);
  if (response) {
    yield put(entity.success(id, response));
  } else {
    yield put(entity.failure(id, error));
  }
}
