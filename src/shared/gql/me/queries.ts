import {gql, useQuery} from '@apollo/client';
import {QueryHookOptions} from '@apollo/react-hooks';
import shiftTemplateFields from './fields';
import {GetShiftTemplateByFacilityIdData, GetShiftTemplateByFacilityIdVariables} from './types';
import useAppDispatch from '../../hooks/useAppDispatch';
import {getShiftTemplates, setShiftTemplates} from '../../slices/shiftTemplateSlice';

const getShiftTemplateByFacilityId = (fields: string = shiftTemplateFields) => gql`
  query ($facilityId: String!) {
    getShiftTemplateByFacilityId(facilityId: $facilityId){
      ${fields}
    }
  }
`;

const useGetShiftTemplateByFacilityId = (
  options?: QueryHookOptions<GetShiftTemplateByFacilityIdData, GetShiftTemplateByFacilityIdVariables>,
  fields?: string
) => {
  const dispatch = useAppDispatch();

  dispatch(getShiftTemplates());

  return useQuery<GetShiftTemplateByFacilityIdData, GetShiftTemplateByFacilityIdVariables>(
    getShiftTemplateByFacilityId(fields),
    {
      ...options,
      onCompleted: data => {
        dispatch(setShiftTemplates(data));
      },
    }
  );
};
export default useGetShiftTemplateByFacilityId;
