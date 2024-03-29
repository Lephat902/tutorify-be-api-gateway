import { ClassSessionPaginatedResultsResolver } from "./class-session-paginated-results.resolver";
import { ClassSessionResolver } from "./class-session.resolver";
import { ShortClassResolver } from "./short-class.resolver";

export const Resolvers = [
    ClassSessionPaginatedResultsResolver,
    ClassSessionResolver,
    ShortClassResolver,
];