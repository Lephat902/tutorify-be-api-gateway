import { ClassPaginatedResultsResolver } from "./class-paginated-results.resolver";
import { ClassStatisticResolver } from "./class-statistic.resolver";
import { ClassResolver } from "./class.resolver";

export const Resolvers = [
    ClassPaginatedResultsResolver,
    ClassResolver,
    ClassStatisticResolver,
];