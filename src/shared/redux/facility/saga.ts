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
    const variables: GetMeVariables = { id: facilityId };

    // @ts-expect-error
   yield call(client.query({
      query: getMeFacility(),
      variables,
    }).then((response: ApolloQueryResult<GetMeFacilityData>): void => {
      const data = response.data;
      const me = data.Me;

      facilityActions.storeFacilityData({
        ...me,
        allShiftUnits: data.allShiftUnits ,
        allQualificationTypes: data.allQualificationTypes
      });

      Sentry.setUser({
        id: me?.id?.toString() ?? '',
        email: me?.email ?? ''
      });

      coreActions.setLoadingStatus(false);
    }));

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
