import { Resolver, Query, Args } from '@nestjs/graphql';
import { TutorQueryService } from '../tutor-query.service';
import { TutorArgs } from '../args';
import { TutorPaginatedResults } from '../models/tutor-paginated-results.model';

@Resolver(() => TutorPaginatedResults)
export class TutorPaginatedResultsResolver {
  constructor(
    private readonly tutorService: TutorQueryService,
  ) {}

  @Query(() => TutorPaginatedResults, { name: 'tutors' })
  async getTutorsAndTotalCount(@Args() filters: TutorArgs) {
    return this.tutorService.getTutorsAndTotalCount(filters);
  }
}
