import { all, fork, AllEffect, ForkEffect } from 'redux-saga/effects';
import counterSagas from './counter/saga';
import coreSagas from './core/saga';
import facilitySagas from './facility/saga';

export default function* rootSaga(): Generator<
  AllEffect<ForkEffect<void>>,
  void,
  unknown
> {
  yield all([fork(counterSagas)]);
  yield all([fork(coreSagas)]);
  yield all([fork(facilitySagas)]);
}
