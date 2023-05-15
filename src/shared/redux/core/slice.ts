import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
export interface CoreData {
  token: string;
  facilityId: number | null;
  role: string;
}

export interface CoreSlice extends CoreData { }


const initialState: CoreSlice = {
    token: '',
    facilityId: null,
    role: 'facility'
};

export const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    storeCoreData: (state, action: PayloadAction<CoreData>) => {
      state.token = action.payload.token;
      state.facilityId = action.payload.facilityId;
      state.role = action.payload.role;
    },
    storeCoreDataAsync: (state, action: PayloadAction<CoreData>) => {}
  },
});

export const selectCoreFacilityId = (state: RootState): number | null => state.core.facilityId;

export const {
    actions: coreActions,
    reducer: coreReducer
  } =
    coreSlice;
