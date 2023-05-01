import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Shift } from '../../gql/shift/types';

export interface ShiftSlice {
  postedShifts: Shift[];
  selectedShiftIdToCopy: number;
}

const initialState: ShiftSlice = {
  postedShifts: [],
  selectedShiftIdToCopy: 0
};

export interface NewShiftPayload {
  unit: number;
  name: string;
  type: string;
  breakDuration: number;
  startDateTime: string;
  endDateTime: string;
  qualifications: string[];
  description: string;
}

export const shiftSlice = createSlice({
  name: 'shift',
  initialState,
  reducers: {
    storePostedShift: (state, action: PayloadAction<Shift>) => {
      state.postedShifts = [...state.postedShifts, action.payload];
    },
    postShiftDataAsync: (state, action: PayloadAction<NewShiftPayload>) => {},
    setSelectedShiftIdToCopy: (state, action: PayloadAction<number>) => {
      state.selectedShiftIdToCopy = action.payload;
    },
    resetShiftIdToCopy: (state) => {
      state.selectedShiftIdToCopy = 0;
    }
  },
});

export const selectPostedShifts = (state: RootState): Shift[] => state.shift.postedShifts ?? [];
export const selectShiftIdToCopy = (state: RootState): number => state.shift.selectedShiftIdToCopy;
export const selectShiftFromPostedShifts =
  (shiftId: number) => (state: RootState): Shift | undefined =>
    state.shift.postedShifts.find(shift => shift.id === shiftId);

export const {
  actions: shiftActions,
  reducer: shiftReducer,
} =
  shiftSlice;
