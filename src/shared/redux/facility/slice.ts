import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import transformRates from '../../utils/groupRatesByUnit';
import { FacilityData, FacilityUnitAndTypes } from '../../gql/facility/types';

const initialState: FacilityData = {
  id: 0,
  name: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  email: '',
  allowedQualifications: [],
  covidStatus: '',
  rates: [],
  covidVaccineRequired: false,
  covidMedicalExemption: false,
  covidReligiousExemption: false,
  allShiftUnits: [],
  allQualificationTypes: []
};

export const facilitySlice = createSlice({
  name: 'facility',
  initialState,
  reducers: {
    storeFacilityData: (state, action: PayloadAction<FacilityData>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.rates = action.payload.rates;
      state.timezone = action.payload.timezone;
      state.email = action.payload.email;
      state.allowedQualifications = action.payload.allowedQualifications;
      state.covidStatus = action.payload.covidStatus;
      state.allQualificationTypes = action.payload.allQualificationTypes;
      state.allShiftUnits = action.payload.allShiftUnits;
    },
    fetchFacilityDataAsync: (state) => {}
  },
});

export const selectFacilityName = (state: RootState): string => state.facility.name ?? '';
export const selectFacility = (state: RootState): FacilityData => state.facility;
export const selectFacilityUnitsAndTypes = (state: RootState): FacilityUnitAndTypes[] => transformRates(state.facility.rates ?? [], state.facility.allShiftUnits ?? []) ?? [];
export const selectFacilityQualifications = (state: RootState): string[] => state.facility.allowedQualifications ?? [];
export const selectFacilityTimezone = (state: RootState): string => state.facility.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;

export const {
    actions: facilityActions,
    reducer: facilityReducer
  } =
    facilitySlice;
