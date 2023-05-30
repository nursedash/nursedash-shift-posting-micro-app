import { put, takeLatest, Effect, ForkEffect } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { coreActions, CoreData } from './slice';
import jwtDecode from 'jwt-decode';
import { NDAuthToken } from '../../types/ndAuthToken';
import logError from '../../utils/logError';
import { facilityActions } from '../facility/slice';

export function* watchStoreCoreDataAsync(
  action: PayloadAction<CoreData>
): Generator<Effect, void> {
  try {
    const { payload } = action;

    const lsCoreData: CoreData = {
      token: localStorage.getItem('token') ?? '',
      facilityId: parseInt(localStorage.getItem('facilityId') ?? '0'),
      role: localStorage.getItem('role') ?? 'facility'
    }

    const coreData = payload.token !== '' ? payload : lsCoreData;
    const token: NDAuthToken | null= coreData.token !== '' ? jwtDecode(coreData.token) : null;

    localStorage.setItem('token', coreData.token);
    localStorage.setItem('role', token?.role ?? coreData.role);
    localStorage.setItem('facilityId', coreData?.facilityId?.toString() ?? '');

    yield put(coreActions.storeCoreData(coreData));
    if (coreData.token !== '') {
      yield put(facilityActions.fetchFacilityDataAsync())
    }
  } catch (error) {
    logError(error);
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
