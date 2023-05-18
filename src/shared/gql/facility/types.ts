
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

export interface FacilityUnitAndTypes {
  unitId: number;
  unitName: string;
  types: Type[];
}
