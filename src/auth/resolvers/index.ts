import { StudentResolver } from './student.resolver';
import { TutorResolver } from './tutor.resolver';
import { UserPaginatedResultsResolver } from './user-paginated-results.resolver';
import { UserStatisticByYearResolver } from './user-statistic-by-year.resolver';
import { UserResolver } from './user.resolver';

export const Resolvers = [
    UserResolver,
    UserPaginatedResultsResolver,
    TutorResolver,
    StudentResolver,
    UserStatisticByYearResolver,
];
