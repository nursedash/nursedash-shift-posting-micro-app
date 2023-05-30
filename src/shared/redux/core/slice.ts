import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
export interface CoreData {
  token: string;
  facilityId: number | null;
  role: string;
  isLoading?: boolean;
  tokenStored?: boolean
}

export interface CoreSlice extends CoreData { }

const initialState: CoreSlice = {
  token: '',
  facilityId: null,
  role: 'facility',
  isLoading: true,
  tokenStored: false
};

export const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    storeCoreData: (state, action: PayloadAction<CoreData>) => {
      state.token = action.payload.token;
      state.facilityId = action.payload.facilityId;
      state.role = action.payload.role;
      state.tokenStored = action.payload?.tokenStored ?? false;
    },
    storeCoreDataAsync: (state, action: PayloadAction<CoreData>) => {},
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    redirectToLogin: () => {
      const loginUrl = `${process.env.REACT_APP_NURSEDASH_LEGACY_URL ?? ''}/#/login`;
      window.location.assign(loginUrl);
    }
  },
});

export const selectCoreFacilityId = (state: RootState): number | null => state.core.facilityId;
export const selectLoadingStatus = (state: RootState): boolean | undefined => state.core.isLoading;
export const selectTokenStorageStatus = (state: RootState): boolean | undefined => state.core.tokenStored;

export const {
    actions: coreActions,
    reducer: coreReducer
  } =
    coreSlice;
