import { Effect, ForkEffect, select, call, takeLatest, put } from 'redux-saga/effects';
import { facilityActions } from './slice';
import { coreActions, selectCoreFacilityId } from '../core/slice';
import { client } from '../../../core/providers/ApolloProvider';
import getMeFacility from '../../gql/me/queries';
import { GetMeFacilityData, GetMeVariables } from '../../gql/me/types';
import { ApolloQueryResult } from '@apollo/client';
import { toast } from "react-toastify";

export function* watchStoreFacilityDataAsync(): Generator<Effect, void> {
  try {
    const facilityId = (yield select(selectCoreFacilityId)) as number;
    const variables: GetMeVariables = { id: facilityId };

    // @ts-expect-error
    const response: ApolloQueryResult<GetMeFacilityData> = yield call(client.query, {
      query: getMeFacility(),
      variables
    });

    yield put(facilityActions.storeFacilityData({
      ...response.data.Me,
      allShiftUnits: response.data.allShiftUnits ,
      allQualificationTypes: response.data.allQualificationTypes
    }));

    yield put(coreActions.setLoadingStatus(false));
  } catch (error) {
    yield put(coreActions.setLoadingStatus(false));
    console.log(error);
    toast.error(`There was an error fetching the facility data. Please reload the page.`);
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
