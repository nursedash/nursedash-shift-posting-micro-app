import { all, fork, AllEffect, ForkEffect } from 'redux-saga/effects';
import coreSagas from './core/saga';
import facilitySagas from './facility/saga';
import shiftSagas from './shift/saga';

export default function* rootSaga(): Generator<
  AllEffect<ForkEffect<void>>,
  void,
  unknown
> {
  yield all([fork(coreSagas)]);
  yield all([fork(facilitySagas)]);
  yield all([fork(shiftSagas)]);
}
