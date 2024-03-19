import { Resolver, Query, Args } from '@nestjs/graphql';
import { TutorQueryService } from '../tutor-query.service';
import { TutorQueryArgs } from '../args';
import { TutorQueryPaginatedResults } from '../models/tutor-paginated-results.model';

@Resolver(() => TutorQueryPaginatedResults)
export class TutorPaginatedResultsResolver {
  constructor(
    private readonly tutorService: TutorQueryService,
  ) {}

  @Query(() => TutorQueryPaginatedResults, { name: 'tutors' })
  async getTutorsAndTotalCount(@Args() filters: TutorQueryArgs) {
    return this.tutorService.getTutorsAndTotalCount(filters);
  }
}
