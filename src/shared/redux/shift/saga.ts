import { Effect, ForkEffect, call, takeEvery, put } from 'redux-saga/effects';
import { NewShiftPayload, shiftActions } from './slice';
import { client } from '../../../core/providers/ApolloProvider';
import { createOverviewShift, cancelOverviewShift } from '../../gql/shift/mutations';
import {
  CancelOverviewShiftResponse, CancelOverviewShiftVariables,
  CreateOverviewShiftData,
  CreateOverviewShiftVariables
} from '../../gql/shift/types';
import { ApolloQueryResult } from '@apollo/client';
import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from "react-toastify";

export function* watchStoreShiftDataAsync(action: PayloadAction<NewShiftPayload>): Generator<Effect, void> {
  try {
    const { payload } = action;
    const variables: CreateOverviewShiftVariables = {
      breakTime: payload.breakDuration,
      description: payload.description,
      end_time: payload.endDateTime,
      qualifications: payload.qualifications,
      start_time: payload.startDateTime,
      type: payload.type,
      unit: payload.unit
    };

    // @ts-expect-error
    const response: ApolloQueryResult<CreateOverviewShiftData> = yield call(client.mutate, {
      mutation: createOverviewShift(),
      variables
    });

    yield put(shiftActions.storePostedShift(response.data.createOverviewShift));
    toast.success(`Shift created successfully`);
    yield put(shiftActions.resetShiftIdToCopy());
  } catch (error) {
    toast.error(`There was an error creating the shift. Please try again.`);
    console.log(error);
  }
}

export function* watchUpdateShiftCancellationAsync(action: PayloadAction<CancelOverviewShiftVariables>): Generator<Effect, void> {
  try {
    const { payload } = action;

    // @ts-expect-error
    const response: ApolloQueryResult<CancelOverviewShiftResponse> = yield call(client.mutate, {
      mutation: cancelOverviewShift(),
      variables: {
        id: payload,
      }
    });

    yield put(shiftActions.updateShiftStatusAsync(response.data.cancelOverviewShift));
    toast.success(`Shift cancelled successfully`);
  } catch (error) {
    toast.error(`There was an error cancelling the shift. Please try again.`);
    console.log(error);
  }
}

export function* watchShiftSagas(): Generator<ForkEffect, void> {
  yield takeEvery(
    shiftActions.postShiftDataAsync,
    watchStoreShiftDataAsync
  );
  yield takeEvery(
    shiftActions.updateShiftStatusAsync,
    watchUpdateShiftCancellationAsync
  );
}

const shiftSagas = watchShiftSagas;

export default shiftSagas;
