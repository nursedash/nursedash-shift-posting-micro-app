import * as R from 'ramda';
import { FacilityRate, FacilityUnitAndTypes, Unit } from '../gql/facility/types';

const transformRates = (rates: FacilityRate[], allUnits: Unit[]): FacilityUnitAndTypes[] => {
  const groupedRates = R.groupBy((rate: FacilityRate) => rate.unit.toString(), rates);
  return R.values(
    R.mapObjIndexed((rateGroup: FacilityRate[], unit: string) => {
      const unitId = parseInt(unit);
      return {
        unitId,
        unitName: allUnits.find((u) => u.id === unitId)?.name ?? '',
        types: rateGroup.map((rate) => {
          return {
            type: rate.type,
            description: rate.description,
            defaultShiftDescription: rate.defaultShiftDescription,
            defaultShiftQualifications: rate.defaultShiftQualifications,
          };
        }),
      };
    }, groupedRates)
  );
};

export default transformRates;