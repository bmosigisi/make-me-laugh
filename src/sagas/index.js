import { put, takeEvery, all, fork, call } from 'redux-saga/effects';

import { getCategories } from '../services/category';
import { FETCH_CATEGORIES } from '../actions';

// ------ Helpers ---------
// Called when the app first loads to fetch any data that is needed.
// Any initial upstart logic e.g. login would be handled here.
function* upstart() {
  const response = yield call(getCategories);

  if (response.success) {
    yield put({ type: FETCH_CATEGORIES.SUCCESS, payload: response.data });
  } else {
    yield put({ type: FETCH_CATEGORIES.FAILURE, payload: response.message });
  }
}

// ------ Handlers --------
function* handleFetchCategoriesFailure() {
  // Retry logic, if any, would go here. For now, we will just remove the loading icon and
  // display an appropriate error message to the user.
  const message = 'Sorry, we could not fetch the categories.';
  console.log('Message', message); // eslint-disable-line
  yield true;
}

// ------ Watchers --------
function* watchGeneric() {
  yield takeEvery(FETCH_CATEGORIES.FAILURE, handleFetchCategoriesFailure);
}

export default function* root() {
  yield* upstart();

  yield all([
    fork(watchGeneric),
  ]);
}
