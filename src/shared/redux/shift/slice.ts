import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  CancelOverviewShiftVariables, GetOverviewShiftVariables,
  NewShiftPayload,
  Shift,
  ShiftInfoForCopyOrEdit,
  ShiftSessionStatus,
  ShiftWithVisibilityToggle
} from '../../gql/shift/types';

interface PostedOrEditedShift {
  shift: ShiftWithVisibilityToggle;
  status: ShiftSessionStatus
}

export interface ShiftSlice {
  postedOrEditedShifts: PostedOrEditedShift[];
  shiftInfoForCopyOrEdit: ShiftInfoForCopyOrEdit
  allCompletedShifts: Shift[];
}

const initialState: ShiftSlice = {
  postedOrEditedShifts: [],
  shiftInfoForCopyOrEdit: {
    id: 0,
    isEdit: false
  },
  allCompletedShifts: []
};

export const shiftSlice = createSlice({
  name: 'shift',
  initialState,
  reducers: {
    storePostedShift: (state, action: PayloadAction<ShiftWithVisibilityToggle>) => {
      state.postedOrEditedShifts = [{ shift: action.payload, status: ShiftSessionStatus.NEW }, ...state.postedOrEditedShifts];
    },
    postShiftAsync: (state, action: PayloadAction<NewShiftPayload>) => {},
    cancelShiftAsync: (state, action: PayloadAction<CancelOverviewShiftVariables>) => {},
    storeUpdatedShift: (state, action: PayloadAction<Partial<Shift> & Required<Pick<Shift, 'id'>>>) => {
      const payload = action.payload;
      const { id } = payload;
      const shiftIndex = state.postedOrEditedShifts.findIndex(shift => shift.shift.id === id);
      if (shiftIndex !== -1) {
        const shift = state.postedOrEditedShifts[shiftIndex].shift;
        state.postedOrEditedShifts[shiftIndex] = { shift: {...shift, ...payload}, status: ShiftSessionStatus.EDITED} ;
      }
    },
    updateShiftAsync: (state, action: PayloadAction<NewShiftPayload>) => {},
    storeShiftInfoForCopyOrEdit: (state, action: PayloadAction<ShiftInfoForCopyOrEdit>) => {
      const { id, isEdit } = action.payload;
      state.shiftInfoForCopyOrEdit.id = id;
      state.shiftInfoForCopyOrEdit.isEdit = isEdit;
    },
    resetShiftInfoToCopyOrEdit: (state) => {
      state.shiftInfoForCopyOrEdit = initialState.shiftInfoForCopyOrEdit;
    },
    getCompletedShiftsAsync: (state, action: PayloadAction<any>) => {},
    storeCompletedShifts: (state, action: PayloadAction<Shift[]>) => {
      state.allCompletedShifts = action.payload;
    },
    getOverviewShiftForCopyAsync: (state, action: PayloadAction<GetOverviewShiftVariables>) => {},
  },
});

export const selectAllCompletedShifts = (state: RootState): Shift[] => state.shift.allCompletedShifts ?? [];
export const selectPostedOrEditedShifts = (state: RootState): PostedOrEditedShift[] => state.shift.postedOrEditedShifts?.filter(s => s.shift.isHidden !== true) ?? [];
export const selectShiftInfoForCopyOrEdit = (state: RootState): ShiftInfoForCopyOrEdit => state.shift.shiftInfoForCopyOrEdit;
export const selectShiftFromPostedOrEditedShifts =
  (shiftId: number) => (state: RootState): PostedOrEditedShift | undefined =>
    state.shift.postedOrEditedShifts.find(shift => shift.shift.id === shiftId);

export const {
  actions: shiftActions,
  reducer: shiftReducer,
} =
  shiftSlice;
