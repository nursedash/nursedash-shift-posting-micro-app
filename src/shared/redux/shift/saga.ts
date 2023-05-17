import { Effect, ForkEffect, call, takeEvery, put, select, takeLatest } from 'redux-saga/effects';
import { selectShiftFromPostedOrEditedShifts, shiftActions } from './slice';
import { client } from '../../../core/providers/ApolloProvider';
import { createOverviewShift, cancelOverviewShift, updateOverviewShift } from '../../gql/shift/mutations';
import {
  CancelOverviewShiftResponse,
  CancelOverviewShiftVariables,
  CreateOverviewShiftData,
  CreateOverviewShiftVariables,
  NewShiftPayload,
  UpdateOverviewShiftResponse,
  GetAllCompletedShiftsResponse, GetAllCompletedShiftsVariables, GetOverviewShiftResponse, GetOverviewShiftVariables
} from '../../gql/shift/types';
import { ApolloQueryResult } from '@apollo/client';
import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from "react-toastify";
import { getAllCompletedShifts, getOverviewShift } from '../../gql/shift/queries';

const mapShiftFormVariables = (payload: NewShiftPayload): CreateOverviewShiftVariables => ({
  breakTime: payload.breakDuration,
  description: payload.description,
  end_time: payload.endDateTime,
  qualifications: payload.qualifications,
  start_time: payload.startDateTime,
  type: payload.type,
  unit: payload.unit
});

export function* watchPostShiftDataAsync(action: PayloadAction<NewShiftPayload>): Generator<Effect, void> {
  try {
    const { payload } = action;
    const variables = mapShiftFormVariables(payload);

    // @ts-expect-error
    const response: ApolloQueryResult<CreateOverviewShiftData> = yield call(client.mutate, {
      mutation: createOverviewShift(),
      variables
    });

    yield put(shiftActions.storePostedShift(response.data.createOverviewShift));
    toast.success(`Shift created successfully`);
  } catch (error) {
    toast.error(`There was an error creating the shift. Please try again.`);
    console.log(error);
  }
}

export function* watchCancelShiftAsync(action: PayloadAction<CancelOverviewShiftVariables>): Generator<Effect, void> {
  try {
    const id = action.payload.id;

    // @ts-expect-error
    const response: ApolloQueryResult<CancelOverviewShiftResponse> = yield call(client.mutate, {
      mutation: cancelOverviewShift(),
      variables: {
        id
      }
    });

    yield put(shiftActions.storeUpdatedShift(response.data.cancelShift));
    toast.success(`Shift cancelled successfully`);
  } catch (error) {
    toast.error(`There was an error cancelling the shift. Please try again.`);
    console.log(error);
  }
}

export function* watchUpdateShiftAsync(action: PayloadAction<NewShiftPayload>): Generator<Effect, void> {
  try {
    const { payload } = action;
    const variables = {
      id: payload.id,
      ...mapShiftFormVariables(payload)
    };

    // @ts-expect-error
    const response: ApolloQueryResult<UpdateOverviewShiftResponse> = yield call(client.mutate, {
      mutation: updateOverviewShift(),
      variables
    });

    yield put(shiftActions.storeUpdatedShift(response.data.updateOverviewShift));
    yield put(shiftActions.resetShiftInfoToCopyOrEdit());
    toast.success(`Shift updated successfully`);
  } catch (error) {
    toast.error(`There was an error updating this shift. Please try again.`);
    console.log(error);
  }
}

export function* watchGetCompletedShiftsAsync(action: PayloadAction<GetAllCompletedShiftsVariables>): Generator<Effect, void> {
  try {
    const { payload } = action;
    console.log(payload);
    const variables = {};

    // @ts-expect-error
    const response: ApolloQueryResult<GetAllCompletedShiftsResponse> = yield call(client.query, {
      query: getAllCompletedShifts(),
      variables
    });

    yield put(shiftActions.storeCompletedShifts(response.data.allCompletedShifts));
  } catch (error) {
    toast.error(`There was an error retrieving the shift data. Please reload and try again.`);
    console.log(error);
  }
}

export function* watchGetOverviewShiftForCopyAsync(action: PayloadAction<GetOverviewShiftVariables>): Generator<Effect, void> {
  try {
    const { id } = action.payload;
    const shift = yield select(selectShiftFromPostedOrEditedShifts(id));

    if (shift != null) {
      return;
    }

    const variables = {
      id
    };
    
    // @ts-expect-error
    const response: ApolloQueryResult<GetOverviewShiftResponse> = yield call(client.query, {
      query: getOverviewShift(),
      variables
    });

    yield put(shiftActions.storePostedShift({...response.data.OverviewShift, isHidden: action.payload.isHidden }));
  } catch (error) {
    toast.error(`There was an error setting your copied shift data. Please go back to the shift and try again.`);
    console.log(error);
  }
}

export function* watchShiftSagas(): Generator<ForkEffect, void> {
  yield takeEvery(
    shiftActions.postShiftAsync,
    watchPostShiftDataAsync
  );
  yield takeEvery(
    shiftActions.cancelShiftAsync,
    watchCancelShiftAsync
  );
  yield takeEvery(
    shiftActions.updateShiftAsync,
    watchUpdateShiftAsync
  );
  yield takeEvery(
    shiftActions.getCompletedShiftsAsync,
    watchGetCompletedShiftsAsync
  );
  yield takeLatest(
    shiftActions.getOverviewShiftForCopyAsync,
    watchGetOverviewShiftForCopyAsync
  );
}

const shiftSagas = watchShiftSagas;

export default shiftSagas;
