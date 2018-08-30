import { put, takeEvery, all, fork } from 'redux-saga/effects';
import * as actions from '../actions';

// Handlers
function* handleGeneric() {
  yield put(actions.GENERIC_START, { hey: 'hey' });
}

// Watchers.
function* watchGeneric() {
  yield takeEvery(actions.GENERIC_TRIGGER, handleGeneric);
}

export default function* root() {
  yield all([
    fork(watchGeneric),
  ]);
}
