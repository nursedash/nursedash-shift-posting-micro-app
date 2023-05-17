import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
export interface CoreData {
  token: string;
  facilityId: number | null;
  role: string;
  isLoading?: boolean
}

export interface CoreSlice extends CoreData { }

const initialState: CoreSlice = {
    token: '',
    facilityId: null,
    role: 'facility',
    isLoading: true
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
    storeCoreDataAsync: (state, action: PayloadAction<CoreData>) => {},
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
});

export const selectCoreFacilityId = (state: RootState): number | null => state.core.facilityId;
export const selectLoadingStatus = (state: RootState): boolean | undefined => state.core.isLoading;

export const {
    actions: coreActions,
    reducer: coreReducer
  } =
    coreSlice;
