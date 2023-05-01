import { DocumentNode, gql} from '@apollo/client';
import shiftFields from './fields';

const createOverviewShift = (fields: string = shiftFields): DocumentNode => gql`
    mutation createOverviewShift($breakTime: Int, $description: String, $end_time: DateTime, $start_time: DateTime, $type: String, $unit: Int, $qualifications: [String]!) {
        createOverviewShift(breakTime: $breakTime, description: $description, end_time: $end_time, start_time: $start_time, type: $type, unit: $unit, qualifications: $qualifications) {
            ${fields}
        }
    }
`;

export default createOverviewShift;
