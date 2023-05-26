import { Effect, ForkEffect, select, call, takeLatest, put } from 'redux-saga/effects';
import { facilityActions } from './slice';
import { coreActions, selectCoreFacilityId } from '../core/slice';
import { client } from '../../../core/providers/ApolloProvider';
import getMeFacility from '../../gql/me/queries';
import { GetMeFacilityData, GetMeVariables } from '../../gql/me/types';
import { ApolloQueryResult } from '@apollo/client';
import * as Sentry from '@sentry/react';
import logError from '../../utils/logError';

export function* watchStoreFacilityDataAsync(): Generator<Effect, void> {
  try {
    const facilityId = (yield select(selectCoreFacilityId)) as number;
    if (facilityId == null || facilityId === 0) {
      const msg = 'No facility ID present in local storage.';
      logError(new Error(msg));
    } else {
      const variables: GetMeVariables = { id: facilityId };

      // @ts-expect-error
      const response: ApolloQueryResult<GetMeFacilityData> = yield call(client.query, {
        query: getMeFacility(),
        variables
      });

      yield put(facilityActions.storeFacilityData({
        ...response.data.Me,
        allShiftUnits: response.data.allShiftUnits,
        allQualificationTypes: response.data.allQualificationTypes
      }));

      Sentry.setUser({
        id: response?.data?.Me?.id?.toString() ?? '',
        email: response?.data?.Me?.email ?? ''
      });

      yield put(coreActions.setLoadingStatus(false));
    }
  } catch (error) {
    yield put(coreActions.setLoadingStatus(false));
    const msg = `There was an error fetching the facility data. Please reload the page.`;
    logError(error, msg);
  }
}

export function* watchFacilitySagas(): Generator<ForkEffect, void> {
  yield takeLatest(
    facilityActions.fetchFacilityDataAsync,
    watchStoreFacilityDataAsync
  );
}

const facilitySagas = watchFacilitySagas;

export default facilitySagas;
