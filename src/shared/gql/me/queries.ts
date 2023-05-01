import { DocumentNode, gql} from '@apollo/client';
import allFacilityFields from '../facility/fields';
import allMeFields from './fields';

const getMeFacility = (facilityFields: string = allFacilityFields, meFields: string = allMeFields): DocumentNode => gql`
  query Facility($id: Int!) {
    Me:Facility(id: $id) {
      ${facilityFields}
      ${meFields}
    }
  }
`;

export default getMeFacility;
