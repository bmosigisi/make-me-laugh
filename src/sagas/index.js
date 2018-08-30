import { put, takeEvery, all, fork, call } from 'redux-saga/effects';

import { actionTypes } from '../actions';
import { getCategories } from '../services/category';
import { show as getJoke } from '../services/joke';

// ------ Helpers ---------
// Called when the app first loads to fetch any data that is needed.
// Any initial upstart logic e.g. login would be handled here.
function* upstart() {
  const response = yield call(getCategories);

  if (response.success) {
    yield put({ type: actionTypes.FETCH_CATEGORIES.SUCCESS, payload: response.data });
  } else {
    yield put({ type: actionTypes.FETCH_CATEGORIES.FAILURE, payload: response.message });
  }
}

// ------ Handlers --------
function* handleFetchCategoriesFailure({ payload }) {
  // We should remove the loading icon and display an appropriate error message to the user,
  // using some sort of alert or snackbar. Retry logic, if any, would also go here.
  const message = 'Sorry, we could not fetch the categories.';
  console.log('Message', message, payload); // eslint-disable-line
  yield true;
}

function* handleFetchJokeFailure({ payload }) {
  const message = 'Sorry, we could not find a joke in that category.';
  console.log('Message', message, payload); // eslint-disable-line
  yield true;
}

function* handleFetchJokeBegin({ payload: category }) {
  yield put({ type: actionTypes.FETCH_JOKE.PROGRESS, payload: true });

  const response = yield call(getJoke, category);
  if (response.success) {
    const successPayload = {
      category,
      joke: {
        iconUrl: response.data.icon_url,
        value: response.data.value,
      },
    };
    yield put({ type: actionTypes.FETCH_JOKE.SUCCESS, payload: successPayload });
  } else {
    yield put({ type: actionTypes.FETCH_JOKE.SUCCESS, payload: response.message });
  }
}

// ------ Watchers --------
function* watchFetchCategoriesFailure() {
  yield takeEvery(actionTypes.FETCH_CATEGORIES.FAILURE, handleFetchCategoriesFailure);
}

function* watchFetchJokeBegin() {
  yield takeEvery(actionTypes.FETCH_JOKE.BEGIN, handleFetchJokeBegin);
}

function* watchFetchJokeFailure() {
  yield takeEvery(actionTypes.FETCH_JOKE.FAILURE, handleFetchJokeFailure);
}

export default function* root() {
  yield* upstart();

  yield all([
    fork(watchFetchCategoriesFailure),
    fork(watchFetchJokeBegin),
    fork(watchFetchJokeFailure),
  ]);
}
