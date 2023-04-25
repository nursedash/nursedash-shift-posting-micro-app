import { FacilityData } from '../../redux/facility/slice';

interface GetMeFacilityData {
  Me: FacilityData,
  allShiftUnits: Array<{ id: number; name: string }>;
  allQualificationTypes: Array<{ id: number; name: string }>;
}

interface GetMeVariables {
  id: number;
}

export type {
  GetMeVariables,
  GetMeFacilityData
};
