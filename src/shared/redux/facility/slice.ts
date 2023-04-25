import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import transformRates from '../../utils/groupRatesByUnit';

export interface FacilityRate {
  unit: number;
  type: string;
  description: string | null
  defaultShiftDescription: string | null;
  defaultShiftQualifications: string[] | null;
}

export interface Unit {
  id: number;
  name: string;
}

export interface Type {
  type: string;
  description: string | null;
  defaultShiftDescription: string | null;
  defaultShiftQualifications: string[] | null;
}

export interface FacilityData {
  id: number;
  name: string;
  timezone: string;
  email: string;
  allowedQualifications: string[];
  covidStatus: string;
  rates: FacilityRate[];
  covidVaccineRequired: boolean;
  covidMedicalExemption: boolean;
  covidReligiousExemption: boolean;
  allShiftUnits: Unit[];
  allQualificationTypes: Array<{ id: number; name: string }>;
}

export interface FacilitySlice extends FacilityData { }

export interface FacilityUnitAndTypes {
  unitId: number;
  unitName: string;
  types: Type[];
}

const initialState: Partial<FacilitySlice> = {
    id: parseInt(localStorage.getItem('facilityId') ?? '0'),
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
export const selectFacilityUnitsAndTypes = (state: RootState): FacilityUnitAndTypes[] => transformRates(state.facility.rates ?? [], state.facility.allShiftUnits ?? []) ?? [];
export const selectFacilityQualifications = (state: RootState): string[] => state.facility.allowedQualifications ?? [];

export const {
    actions: facilityActions,
    reducer: facilityReducer
  } =
    facilitySlice;
