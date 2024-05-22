import { ClassPaginatedResultsResolver } from "./class-paginated-results.resolver";
import { ClassStatisticByYearResolver } from "./class-statistic-by-year.resolver";
import { ClassResolver } from "./class.resolver";

export const Resolvers = [
    ClassPaginatedResultsResolver,
    ClassResolver,
    ClassStatisticByYearResolver,
];