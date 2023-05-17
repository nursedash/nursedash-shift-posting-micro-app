import { put, takeLatest, Effect, ForkEffect } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { coreActions, CoreData } from './slice';
import jwtDecode from 'jwt-decode';
import { NDAuthToken } from '../../types/ndAuthToken';

export function* watchStoreCoreDataAsync(
  action: PayloadAction<CoreData>
): Generator<Effect, void> {
  try {
    const { payload } = action;

    const lsCoreData: CoreData = {
      token: localStorage.getItem('token') ?? '',
      facilityId: parseInt(localStorage.getItem('facilityId') ?? '0'),
      role: localStorage.getItem('role') ?? 'facility',
      isLoading: true
    }

    const coreData = payload.token !== '' ? payload : lsCoreData;

    if (coreData.token === '' || coreData.facilityId === 0) {
      window.location.assign('https://facility-staging.nursedash.com/#/login');
    }

    const token: NDAuthToken = jwtDecode(coreData.token);

    localStorage.setItem('token', coreData.token);
    localStorage.setItem('role', token.role ?? coreData.role);
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
