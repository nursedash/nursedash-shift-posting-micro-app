import { put, takeLatest, Effect, ForkEffect } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { coreActions, CoreData } from './slice';

export function* watchStoreCoreDataAsync(
  action: PayloadAction<CoreData>
): Generator<Effect, void> {
  try {
    const { payload } = action;

    const lsCoreData: CoreData = {
      token: localStorage.getItem('token') ?? '',
      facilityId: parseInt(localStorage.getItem('facilityId') ?? '0')
    }

    const coreData = payload.token !== '' ? payload : lsCoreData;

    if (coreData.token === '' || coreData.facilityId === 0) {
      window.location.assign('https://facility-staging.nursedash.com/#/login');
    }

    localStorage.setItem('token', coreData.token);
    localStorage.setItem('facilityId', coreData?.facilityId?.toString() ?? '');

    yield put(coreActions.storeCoreData(coreData));
  } catch (error) {
    console.log(error);
  }
}

export function* watchCoreSagas(): Generator<ForkEffect, void> {
  yield takeLatest(
    coreActions.storeCoreDataAsync,
    watchStoreCoreDataAsync
  );
}

const coreSagas = watchCoreSagas;

export default coreSagas;
