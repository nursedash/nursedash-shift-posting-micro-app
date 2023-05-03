import { DocumentNode, gql} from '@apollo/client';
import shiftFields from './fields';

const getAllCompletedShifts = (fields: string = shiftFields): DocumentNode => gql`
 query allCompletedShifts($page: Int, $perPage: Int, $sortField: String, $sortOrder: String, $filter: CompletedShiftFilter) {
    allCompletedShifts(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder, filter: $filter) {
      ${fields}
    }
 }
`

export { getAllCompletedShifts };