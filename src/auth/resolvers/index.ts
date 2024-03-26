import { UserResolver } from './user.resolver';
import { UserPaginatedResultsResolver } from './user-paginated-results.resolver';
import { TutorResolver } from './tutor.resolver';
import { StudentResolver } from './student.resolver';

export const Resolvers = [
    UserResolver,
    UserPaginatedResultsResolver,
    TutorResolver,
    StudentResolver,
];
